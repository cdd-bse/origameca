var header=`
<a href="index.html" class="marca" ><h2 class="animate__animated animate__zoomIn" id="marca">Origameca </h2><i><img src="icon/Runner64.ico" alt="BladeRunner"></i></a>
<input type="checkbox" id="check">
<label for="check" class="mostrar-menu">&#8801</label>
<nav class="menu">
<a href="index.html#catalog">Catálogo</a>
<a href="index.html#nosotros">Nosotros</a>
<a href="index.html#contacto">Contacto</a>
<a href="index.html#visitanos">Visitanos</a>
<a href="inventario.html">Acceso</a>
<label for="check" class="esconder-menu">&#215</label>
</nav>
`
document.getElementById("inicio_pag").innerHTML=header;

footer=`
<div class="footer-content">
            <h2>Origameca</h2>
            <h5>Tienda de origami</h5>
        </div>
        <br>
        <div class="social-icons">
            <a href="https://facebook.com"><i class="fa-brands fa-facebook" style="color: #ffffff;"></i></a>
            <a href="https://twitter.com"><i class="fa-brands fa-twitter" style="color: #ffffff;"></i></a>
            <a href="https://instagram.com"><i class="fa-brands fa-instagram" style="color: #ffffff;"></i></a>
            <a href="https://pinterest.com"><i class="fa-brands fa-pinterest" style="color: #ffffff;"></i></a>
        </div>

        <div class="box2">
            <img id="weather-icon" class="weather-icon" src="." alt="Icono del tiempo"><br>
            <span class="weather-font">BUENOS AIRES</span><br>
            <span class="weather-font" id="temperature"></span><br>
            <span class="weather-font" id="pressure"></span><br>
            <span class="weather-font" id="humidity"></span><br>
        </div>
`
document.getElementById("pie_pagina").innerHTML=footer