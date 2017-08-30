<?php

function PortfolioItem($title, $description, $tags, $imgid, $linkid)
{
  echo "<div class='blob'>\n";

  echo "<div>";
  echo "<img src='" . doc_root . "/resources/image/" . $imgid ."' style='width:100%; border-radius: 6px 6px 0px 0px;'/>\n";
  echo "<div class='fadeb' style='position:relative;'></div>\n";
  echo "</div>";

  echo "<h1 style='margin-top:-10px; text-align: center;'>" . $title . "</h1>\n";

  $tagLibrary = array(
    "win10" => "Universal Windows 10 Application"
  );

  if ( (is_array($tags) || is_object($tags)) && count($tags) )
  {
    echo "<p style='text-align:center;'>\n";

    foreach($tags as $tagid)
    {
      echo "<span class='label label-" . $tagid . "'>" . $tagLibrary[$tagid] . "</span><br/>";
    }

    echo "</p>\n";
  }

  echo "<a href='#'>Read More</a>\n";

  echo "</div>\n";
}
?>
