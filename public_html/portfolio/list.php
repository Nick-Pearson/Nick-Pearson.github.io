<?php define("doc_root", ".."); ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <?php include doc_root . "/resources/html/meta.html"; ?>
    <title>Nick Pearson - Porfolio</title>

    <!-- styles -->
    <link rel="stylesheet" href="../components/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../resources/css/style.css"/>

    <!-- fonts -->
    <link href='https://fonts.googleapis.com/css?family=Abel|Press+Start+2P' rel='stylesheet' type='text/css'>
    <script src="https://use.fontawesome.com/d0bcbf8988.js"></script>

    <style>
    .yeartext
    {
      text-align: center;
    }
    </style>
  </head>

  <body>
    <div class="container" id="main-container">
      <?php include doc_root . "/resources/html/navbar.php"; ?>

      <div class="content">
        <div class="title-block">
          <h1>Project List</h1>
          <p>Here are all the projects I've worked on in the past, click to read more</p>
        </div>

        <?php require_once doc_root . '/resources/php/portfolioitem.php'; ?>
        <h1 class="yeartext">2017</h1>

        <div class="row">
          <div class="col-md-4">
            <?php PortfolioItem("Hello World",
                        "This project was about saying hello world",
                        null,
                        "DI2_Gamescon.jpg",
                        "hello.php"); ?>
          </div>
          <div class="col-md-4">
            <?php PortfolioItem("Hello World",
                        "This project was about saying hello world",
                        null,
                        "DI2_Gamescon.jpg",
                        "hello.php"); ?>
            </div>
            <div class="col-md-4">
              <?php PortfolioItem("Hello World",
                          "This project was about saying hello world",
                          null,
                          "DI2_Gamescon.jpg",
                          "hello.php"); ?>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <?php PortfolioItem("Hello World",
                    "This project was about saying hello world",
                    array("win10", "win10", "win10"),
                    "DI2_Gamescon.jpg",
                    "hello.php"); ?>
          </div>
          <div class="col-md-4">
            <?php PortfolioItem("Hello World",
                    "This project was about saying hello world",
                    null,
                    "DI2_Gamescon.jpg",
                    "hello.php"); ?>
          </div>
        </div>

      </div>
    </div>

    <?php include doc_root . "/resources/html/footer.html"; ?>

    <script>var nav_id = "portfolio";</script>
    <?php include doc_root . "/resources/html/scripts.html"; ?>
  </body>
</html>
