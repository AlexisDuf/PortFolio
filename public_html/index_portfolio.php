<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title> Alexis Dufour</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="Ressources/icone/flaticon.css">
        <link rel="stylesheet" href="Css/index.css">
        <link rel="stylesheet" href="Css/presentation.css">
        <link rel="stylesheet" href="Css/portfolio.css">
    </head>
    <body>

        <header>
            <nav id="menu">
                <ul id="left">
                    <li id="portfolio">Portfolio</li>
                    <!-- <li id="about">About</li>   -->                                       
                </ul>
                <ul id="right">
                    <li id="presentation">Alexis Dufour</li>
                </ul>
            </nav>
            <ul class="social-buttons">                
                <li><a href="https://twitter.com/dufour_alexis" class="twitter" title="Facebook page"><span class="flaticon-social19"></span></a></li>
                <li><a href="http://www.linkedin.com/pub/alexis-dufour/84/29b/187" class="linkedIn" title="LinkedIn"><span class="flaticon-linkedin2"></span></a></li>
                <li><a href="https://github.com/AlexisDuf" class="github" title="github"><span class="flaticon-github7"></span></a></li>
                <li><a href=mailto:dufouralexis@orange.fr class="email" title="email address"><span class="flaticon-mail22"></span></a></li>
            </ul>
        </header>
        <div id="loader">
            <svg class="load">
            <path fill="#2D2D2D" d="M 0,0 L 0,0 L 0,0 L 0,0 Z"></path>
            </svg>
        </div>

        <div id="container">
            <?php include 'content/portfolio.php'; ?>
        </div>           
        <footer>            
        </footer>
        <script type="text/javascript" src="Library/jquery-1.11.0.min.js"></script>

        <!-- jQuery ScrollTo Plugin -->
        <script src="//balupton.github.io/jquery-scrollto/lib/jquery-scrollto.js"></script>

        <!-- History.js -->
        <script src="//browserstate.github.io/history.js/scripts/bundled/html4+html5/jquery.history.js"></script>

        <script type="text/javascript" src="Js/init.js"></script>
        <script type="text/javascript" src="Js/utils.js"></script>

    </body>
</html>