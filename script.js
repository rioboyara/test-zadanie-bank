'use strict';

// ============================================
// Deposit Calculator — Main Logic
// ============================================

const RATES = {
  3:  { base: 6.0,  capitalized: 6.2  },
  6:  { base: 7.5,  capitalized: 7.8  },
  12: { base: 9.0,  capitalized: 9.5  },
  24: { base: 10.0, capitalized: 10.5 },
  36: { base: 10.5, capitalized: 11.0 },
  60: { base: 11.0, capitalized: 11.5 },
};

// DOM elements
const form = document.getElementById('calcForm');
const depositAmountInput = document.getElementById('deposit-amount');
const depositAmountRange = document.getElementById('deposit-amount-range');
const depositDateInput = document.getElementById('deposit-date');
const depositTermSelect = document.getElementById('deposit-term');
const replenishAmountInput = document.getElementById('replenish-amount');
const replenishAmountRange = document.getElementById('replenish-amount-range');
const replenishGroup = document.getElementById('replenishGroup');
const resultsData = document.getElementById('resultsData');

// Set default date to today
depositDateInput.valueAsDate = new Date();

// ============================================
// Number formatting
// ============================================
function formatNumber(num) {
  return Math.round(num).toLocaleString('ru-RU');
}

function formatCurrency(num) {
  return formatNumber(num) + ' ₽';
}

function parseFormattedNumber(str) {
  return parseInt(str.replace(/\s/g, ''), 10) || 0;
}

// ============================================
// Input ↔ Range sync
// ============================================
function syncInputToRange(input, range) {
  input.value = formatNumber(parseInt(range.value, 10));
}

function syncRangeToInput(range, input) {
  const val = parseFormattedNumber(input.value);
  const min = parseInt(range.min, 10);
  const max = parseInt(range.max, 10);
  range.value = Math.min(Math.max(val, min), max);
}

depositAmountRange.addEventListener('input', () => {
  syncInputToRange(depositAmountInput, depositAmountRange);
});

depositAmountInput.addEventListener('input', () => {
  // Allow only digits and spaces
  const raw = depositAmountInput.value.replace(/[^\d]/g, '');
  if (raw) {
    depositAmountInput.value = formatNumber(parseInt(raw, 10));
  }
  syncRangeToInput(depositAmountRange, depositAmountInput);
});

replenishAmountRange.addEventListener('input', () => {
  syncInputToRange(replenishAmountInput, replenishAmountRange);
});

replenishAmountInput.addEventListener('input', () => {
  const raw = replenishAmountInput.value.replace(/[^\d]/g, '');
  if (raw) {
    replenishAmountInput.value = formatNumber(parseInt(raw, 10));
  }
  syncRangeToInput(replenishAmountRange, replenishAmountInput);
});

// Initialize defaults
syncInputToRange(depositAmountInput, depositAmountRange);
syncInputToRange(replenishAmountInput, replenishAmountRange);

// ============================================
// Replenish toggle
// ============================================
document.querySelectorAll('input[name="replenish"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const show = radio.value === 'yes' && radio.checked;
    replenishGroup.hidden = !show;
  });
});

// ============================================
// Mobile burger menu
// ============================================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
let overlay = null;

function createOverlay() {
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMenu);
  }
}

function openMenu() {
  createOverlay();
  burger.classList.add('active');
  burger.setAttribute('aria-expanded', 'true');
  nav.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burger.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  const isOpen = nav.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

// ============================================
// Calculation
// ============================================
function calculate() {
  const amount = parseFormattedNumber(depositAmountInput.value);
  const termMonths = parseInt(depositTermSelect.value, 10);
  const capitalization = document.querySelector('input[name="capitalization"]:checked').value;
  const hasReplenish = document.querySelector('input[name="replenish"]:checked').value === 'yes';
  const monthlyReplenish = hasReplenish ? parseFormattedNumber(replenishAmountInput.value) : 0;

  if (!amount || amount < 10000) {
    depositAmountInput.focus();
    return null;
  }

  const rateData = RATES[termMonths];
  const annualRate = capitalization === 'monthly' ? rateData.capitalized : rateData.base;
  const monthlyRate = annualRate / 100 / 12;

  let total;
  let totalReplenish = monthlyReplenish * termMonths;

  if (capitalization === 'monthly') {
    // Compound interest with monthly capitalization + monthly contributions
    // FV = P*(1+r)^n + PMT*((1+r)^n - 1)/r
    const compoundFactor = Math.pow(1 + monthlyRate, termMonths);
    total = amount * compoundFactor;
    if (monthlyReplenish > 0 && monthlyRate > 0) {
      total += monthlyReplenish * (compoundFactor - 1) / monthlyRate;
    }
  } else {
    // Simple interest at end of term
    total = amount * (1 + annualRate / 100 * (termMonths / 12));
    total += totalReplenish;
  }

  const profit = total - amount - totalReplenish;

  // Calculate end date
  const startDate = depositDateInput.value ? new Date(depositDateInput.value) : new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + termMonths);

  return {
    total,
    initial: amount,
    profit,
    totalReplenish,
    annualRate,
    endDate,
  };
}

// ============================================
// Render results
// ============================================
function renderResults(data) {
  resultsData.hidden = false;

  document.getElementById('resultTotal').textContent = formatCurrency(data.total);
  document.getElementById('resultInitial').textContent = formatCurrency(data.initial);
  document.getElementById('resultProfit').textContent = '+' + formatCurrency(data.profit);
  document.getElementById('resultReplenish').textContent = formatCurrency(data.totalReplenish);
  document.getElementById('resultRate').textContent = data.annualRate.toFixed(1) + '% годовых';
  document.getElementById('resultEndDate').textContent = data.endDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Progress bar
  const total = data.total;
  const initialPct = (data.initial / total) * 100;
  const replenishPct = (data.totalReplenish / total) * 100;
  const profitPct = (data.profit / total) * 100;

  document.getElementById('barInitial').style.width = initialPct + '%';
  document.getElementById('barReplenish').style.width = replenishPct + '%';
  document.getElementById('barProfit').style.width = profitPct + '%';

  // Re-trigger animation
  resultsData.style.animation = 'none';
  resultsData.offsetHeight; // trigger reflow
  resultsData.style.animation = '';
}

function resetResults() {
  // Reset to initial calculated state
  const data = calculate();
  if (data) renderResults(data);
}

// ============================================
// Form events
// ============================================
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = calculate();
  if (data) {
    renderResults(data);
  }
});

form.addEventListener('reset', () => {
  setTimeout(() => {
    syncInputToRange(depositAmountInput, depositAmountRange);
    syncInputToRange(replenishAmountInput, replenishAmountRange);
    replenishGroup.hidden = true;
    depositDateInput.valueAsDate = new Date();
    const data = calculate();
    if (data) renderResults(data);
  }, 0);
});

// Auto-calculate on page load
const initialData = calculate();
if (initialData) renderResults(initialData);
