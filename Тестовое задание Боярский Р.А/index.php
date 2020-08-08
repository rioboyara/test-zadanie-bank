<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<title>Bank</title>
	<link type="text/css" rel="stylesheet" href="css/reset.css" />
	<link type="text/css" rel="stylesheet" href="css/style.css" />

</head>
<body>
	<header>
		<div class="header1">
			<div class="header_logo">
			<img src="images/header_logo.png" alt="logo">
			</div>

			<div class="header_number"><p x-ms-format-detection="none">8-800-100-5005</p><p x-ms-format-detection="none">+7 (3452) 522-000</p> 
			</div>
		</div>

		<div class="menu" id="mymenu">
				<nav class="menu1">
					<a href="" class="but_menu1">Кредитные карты</a>
					<a href="" class="but_menu2">Вклады</a>
					<a href="" class="but_menu3">Дебетовая карта</a>
					<a href="" class="but_menu4">Страхование</a>
					<a href="" class="but_menu5">Друзья</a>
					<a href="" class="but_menu6">Интернет-банк</a>
				</nav>
		</div>
		
	</header>	
	<main>

<!-- Крошки -->
		<div>
			<ul class="breadcrumbs">
 				<li class="breadcrumbs-item"><a class="breadcrumbs-link" href="#">Главная</a>
 				</li>
  				<li class="breadcrumbs-item"><a class="breadcrumbs-link" href="#">Вклады</a>
  				</li>
  				<li class="breadcrumbs-item"><span class="breadcrumbs-link  current">Калькулятор</span>
 				</li>
			</ul>
		</div>

<!-- Калькулятор -->
		<div class="calc_main">
			<h1>Калькулятор</h1>
			<div class="calc_form">
			 <form method="post"> 
			 	<p>
			 		<label for="date" class="labeldate">Дата оформления вклада</label>
                	<input type="date" id="date" name="date"/>
                </p>
                <p>
			 		<label for="summa" class="labelsumma">Сумма вклада</label>
                	<input type="number" id="summa" name="summa" min="1000" max="3000000"/>
                </p>
                <p>
                	<label for="year" class="labelyear" id="labelyear">Срок вклада</label>
			 		<select name="year">
                	<option>1 год</option>
                	<option>2 года</option>
                	<option>3 года</option>
                	<option>4 года</option>
                	<option>5 года</option>
                	</select>
                </p>
                <p>
                <label for="popolnenie" class="labelpopolnenie" id="labelpopolnenie">Пополнение вклада</label>
                <input type="radio" name="popolnenie" value="rad1">Нет
 				<input type="radio" name="popolnenie" value="rad2" style="margin-left: 20px;">Да
 				</p>
 				<p>
                <label for="summap" class="labelsummap">Сумма пополнения вклада</label>
                <input type="number" id="summap" name="summap" min="1000" max="3000000"/>
            	</p>
            </form>
           </div>

            <!-- Кнопка Рассчитать -->
            <div class="btn" style="width:100%; clear:both;">
            	<form>
   					<button class="Shape_12" id="Shape_12" onClick="choose(1)">Рассчитать</button>
  				</form>
  				<p class="itogo">Результат:</p>
        	</div>

        	<!-- Бегунки -->
        	<div class="calc_range">
        		<form onsubmit="return false" oninput="level.value = flevel.valueAsNumber" style="height: 20px;">
				<input name="range_summa" id="range_s" type="range" min="1000" max="3000000" value="1000">
				</form>
				<p class="range_s_p1">1 тыс. руб.</p><p class="range_s_p2">3 000 000</p>
				
				<form onsubmit="return false" oninput="level.value = flevel.valueAsNumber" style="height: 85px;">
				<input name="range_popolnenie" id="range_p" type="range" min="1000" max="3000000" value="1000">
				</form>
				<p class="range_p_p1">1 тыс. руб.</p><p class="range_p_p2">3 000 000</p>
        	</div>


		</div>
	</main>

	<footer>
		<div class="footer1">
			<ul id="footermenu">
				<li><a href="" class="">Кредитные карты</a></li>
				<li><a href="" class="">Вклады</a></li>
				<li><a href="" class="">Дебетовая карта</a></li>
				<li><a href="" class="">Страхование</a></li>
				<li><a href="" class="">Друзья</a></li>
				<li><a href="" class="">Интернет-банк</a></li>
			</ul>
		</div>

	</footer>



















	<script src="script.js"></script>
</body>
</html>