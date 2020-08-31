function qs(key)
{
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function RefreshPage()
{
  location.reload();
}

//start an  AJAX request for the data JSON file
function LoadDataFile(Func)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      dataObj = JSON.parse(this.responseText);
      Func();
    }
  };
  xhttp.open("GET", "./data/projects.json", true);
  xhttp.send();
}

//globals to track the generated blobs
var dataObj = null;
var g_mdParser = null;
var imgLeft = true;
var blobCount = 0;

function AddProjectBlobs(Count)
{
  //check range
  if(Count == 0)
    return;

  if(Count > dataObj.projects.length - blobCount)
    return AddProjectBlobs(dataObj.projects.length - blobCount);

  var containerDiv = $("#project-container");

  for(var projIdx = 0; projIdx < Count; ++projIdx)
  {
    var projData = dataObj.projects[projIdx + blobCount];

    containerDiv.append(GenerateProjectHTMLBlob(projData, imgLeft));
    imgLeft = !imgLeft;
  }

  blobCount += Count;

  if(blobCount >= dataObj.projects.length)
  {
    $("#show-more").hide();
  }
  else
  {
    $("#show-more-text").text("Show " + Math.min(3, dataObj.projects.length - blobCount) + " More");
    $("#show-more").show();
  }
}

function MarkdownParser()
{
  if(g_mdParser == null)
  {
    g_mdParser = new showdown.Converter({ extensions: ["icon"]});
    g_mdParser.setOption("openLinksInNewWindow", true);
  }

  return g_mdParser;
}

function MakeTemplateData(projData)
{
  var TemplateData = {
    YearString:     "",
    LabelsString:   "",
    MainPageLink:   "",
    SummaryString:  "",
    SummaryStringMain: "",
    projData:       null
  };

  var mdParser = MarkdownParser();

  TemplateData.YearString =     GenerateYearString(projData);
  TemplateData.LabelsString =   GenerateLabelHTML(dataObj, projData);
  TemplateData.HasMainPage = projData.mainPageData != undefined;
  TemplateData.MainPageLink =   "./project.html?p=" + projData.projectID;
  TemplateData.SummaryStringMain =  mdParser.makeHtml(projData.summaryMd);
  TemplateData.SummaryString =  TemplateData.SummaryStringMain.substr(0, TemplateData.SummaryStringMain.length - 4) + "... <a href=\"" + TemplateData.MainPageLink + "\">Read More</a></p>";
  TemplateData.projData =       projData;

  return TemplateData;
}

function GenerateProjectHTMLBlob(projData, imgLeft = true)
{
  var TemplateData = MakeTemplateData(projData);

  var LinkType = TemplateData.HasMainPage ? "a" : "div";
  var SummaryType = TemplateData.HasMainPage ? "SummaryString" : "SummaryStringMain";

  var ImgLTemplate = "<div class=\"blob\">\
                        <div class=\"row\">\
                          <" + LinkType + " href=\"{{MainPageLink}}\" class=\"col-md-12 visible-xs visible-sm centered discrete-link\">\
                            <h1>{{projData.projectName}} ({{YearString}})</h1>\
                            {{&LabelsString}}<br/>\
                          </" + LinkType + ">\
                          <" + LinkType + " href=\"{{MainPageLink}}\" class=\"col-md-3 col-sm-12 col-xs-12\">\
                            <div class=\"fader hidden-xs hidden-sm\"></div>\
                            <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </" + LinkType + ">\
                          <div class=\"col-md-9\">\
                            <" + LinkType + " href=\"{{MainPageLink}}\" class=\"hidden-xs hidden-sm discrete-link\">\
                              <h1>{{projData.projectName}}\
                              {{&LabelsString}}</h1>\
                              <p>{{YearString}}</p></a>\
                            </" + LinkType + ">\
                            {{&" + SummaryType + "}}\
                            <span class=\"visible-xs visible-sm\" style = \"margin-top:50px;\"></span>\
                          </div>\
                        </div>\
                      </div>";

  var ImgRTemplate = "<div class=\"blob\">\
                        <div class=\"row\">\
                          <" + LinkType + " href=\"{{MainPageLink}}\" class=\"col-md-12 visible-xs visible-sm centered discrete-link\">\
                            <h1>{{projData.projectName}} ({{YearString}})</h1>\
                            {{&LabelsString}}<br/>\
                          </" + LinkType + ">\
                          <" + LinkType + " href=\"{{MainPageLink}}\" class=\"col-md-3 col-sm-12 col-xs-12 visible-xs visible-sm\">\
                              <div class=\"fadel hidden-xs hidden-sm\"></div>\
                              <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </" + LinkType + ">\
                          <div class=\"col-md-9\" style=\"padding-left:20px;\">\
                            <" + LinkType + " href=\"{{MainPageLink}}\"  class=\"hidden-xs hidden-sm discrete-link\">\
                              <h1>{{projData.projectName}}\
                              {{&LabelsString}}</h1>\
                              <p>{{YearString}}</p>\
                            </" + LinkType + ">\
                            {{&" + SummaryType + "}}\
                            <span class=\"visible-xs visible-sm\" style = \"margin-top:50px;\"></span>\
                          </div>\
                          <" + LinkType + " href=\"{{MainPageLink}}\" class=\"col-md-3 col-sm-12 col-xs-12 hidden-xs hidden-sm\">\
                              <div class=\"fadel hidden-xs hidden-sm\"></div>\
                              <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </" + LinkType + ">\
                        </div>\
                      </div>";

  if(imgLeft)
    return Mustache.to_html(ImgLTemplate, TemplateData);

  return Mustache.to_html(ImgRTemplate, TemplateData);
}

function GenerateLabelHTML(dataObj, projData)
{
  var LabelString = "";

  for(var tagIdx = 0; tagIdx < projData.tags.length; ++tagIdx)
  {
    var TagData = dataObj.tagDefinitions[projData.tags[tagIdx]];

    if(TagData == undefined)
      continue;

    var TagDisplayName = (TagData.displayName != undefined) ? TagData.displayName : projData.tags[tagIdx];

    LabelString = LabelString + "<span class=\"label\" style=\"background-color:#" + TagData.tagColour + "\">" + TagDisplayName + "</span>";
  }

  return LabelString;
}

function GenerateSlideshowHtml(projData)
{
  var SlidesHTML = "";
  var SlideTemplate = "<div><img data-lazy=\"./resources/image/{{imgURL}}\"/></div>";

  for(var imgIdx = 0; imgIdx < projData.galleryImages.length; ++imgIdx)
  {
    TemplateData = { imgURL: projData.galleryImages[imgIdx] };

    SlidesHTML += Mustache.to_html(SlideTemplate, TemplateData);
  }

  return "<div class=\"slideshow\">" + SlidesHTML + "</div>";
}

function GenerateOtherProjectHTML(projData)
{
  var TemplateData = MakeTemplateData(projData);
  var OtherProjectTemplate = "<div class=\"col-md-4 col-sm-4 col-xs-6\">\
                                <div class=\"thumbnail\">\
                                  <a class=\"discrete-link\" href=\"{{MainPageLink}}\">\
                                    <img src=\"./resources/image/{{projData.summaryImage}}\"/>\
                                  </a>\
                                  <div class=\"caption\">\
                                    <a class=\"discrete-link\" href=\"{{MainPageLink}}\">\
                                      <h1>{{projData.projectName}}</h1>\
                                    </a>\
                                    {{&LabelsString}}\
                                    <p>{{&SummaryStringMain}}</p>\
                                  </div>\
                                </div>\
                              </div>";

  return Mustache.to_html(OtherProjectTemplate, TemplateData);
}

function LoadOtherProjects(ignoreProject)
{
  var ValidList = [];

  for(var projIdx = 0; projIdx < dataObj.projects.length; ++projIdx)
  {
    if(dataObj.projects[projIdx] != ignoreProject &&
    dataObj.projects[projIdx].mainPageData != undefined)
    {
      ValidList.push(projIdx);
    }
  }

  //pick randomly from the list
  while(ValidList.length > 3)
  {
    var RemoveIdx = Math.floor(Math.random() * ValidList.length);

    var tmp = ValidList[ValidList.length - 1];
    ValidList[ValidList.length - 1] = ValidList[RemoveIdx];
    ValidList[RemoveIdx] = tmp;

    ValidList.pop();
  }

  var ContainerObject = $("#other-projects-container");

  for(var i = 0; i < ValidList.length; ++i)
  {
    ContainerObject.append(GenerateOtherProjectHTML(dataObj.projects[ValidList[i]]));
  }
}

function LoadProjectPage()
{
  var projID = qs("p");
  var projData = null;

  //try to find the project data
  for(var projIdx = 0; projIdx < dataObj.projects.length; ++projIdx)
  {
    if(dataObj.projects[projIdx].projectID == projID)
    {
      projData = dataObj.projects[projIdx];
      break;
    }
  }

  LoadOtherProjects(projData);

  var ErrorTemplate = "<div class=\"centered\">\
                        <h1>{{ErrorTitle}}</h1>\
                        <p>{{ErrorMessage}}</p>\
                        <p><a href=\"javascript:RefreshPage()\"> <i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Reload Page</a></p>\
                        <p><a href=\"index.html\"> <i class=\"fa fa-home\" aria-hidden=\"true\"></i> Go to Home Page</a></p>\
                      </div>";

  //if the project cannot be found, display an error
  if(projData == null)
  {
    $("#project-container").html(Mustache.to_html(ErrorTemplate, {ErrorMessage: "No Project data could be found", ErrorTitle: "Project Not Found"}));
    return;
  }

  //render details
  var mdParser = MarkdownParser();

  var TemplateData = MakeTemplateData(projData);

  var TitleTemplate = "<div class=\"centered\">\
                        <h1 class=\"section-title\">{{projData.projectName}}</h1>\
                        {{&LabelsString}}\
                        {{&SummaryStringMain}}\
                      </div>\
                      <div class=\"well\" id=\"project-article-container\">\
                        <p class=\"centered\" style=\"font-size: 20px;\"><i class=\"fa fa-cog fa-spin fa-fw\" aria-hidden=\"true\"></i><span class=\"sr-only\">Loading...</span></p>\
                      </div>";

  $("#project-container").html(Mustache.to_html(TitleTemplate, TemplateData));

  if(projData.mainPageData == undefined)
  {
    $("#project-article-container").hide();
    return;
  }

  //begin an AJAX request for the MD file
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4)
    {
      if(this.status == 200) {
        if(projData.galleryImages.length != undefined && projData.galleryImages.length > 0)
        {
          var SlideshowHtml = GenerateSlideshowHtml(projData);

          $("#project-article-container").html("<div class=\"col-md-10 col-md-offset-1\">" + SlideshowHtml + "</div><div class=\"col-md-1\"></div>");
          var slides = $(".slideshow");
          $(".slideshow").slick({
            lazyLoad: 'ondemand',
            dots: true,
            infinite: true,
            speed: 600
          });
        }
        else
        {
          $("#project-article-container").html("");
        }

        $("#project-article-container").append(mdParser.makeHtml(this.responseText));
      }
      else {
        $("#project-article-container").html(Mustache.to_html(ErrorTemplate, {ErrorMessage: "Project article failed to load", ErrorTitle: ""}));
      }
    }
  };
  xhttp.open("GET", "./data/" + projData.mainPageData, true);
  xhttp.send();
}

function GenerateYearString(projData)
{
  var hasMonthRange = (projData.month == undefined);
  var hasYearRange = (projData.year == undefined);

  var monthStart = hasMonthRange ? projData.monthStart : projData.month;
  var monthEnd = hasMonthRange ? projData.monthEnd : projData.month;

  var yearStart = hasYearRange ? projData.yearStart : projData.year;
  var yearEnd = hasYearRange ? projData.yearEnd : projData.year;

  if(monthStart == monthEnd && yearStart == yearEnd)
  {
    return MonthToString(monthStart) + " " + yearStart;
  }

  return MonthToString(monthStart) + " " + yearStart + " - " + MonthToString(monthEnd) + " " + yearEnd;
}

function MonthToString(month)
{
  switch(month)
  {
  case undefined:
    return "";
  case 1:
    return "Jan";
  case 2:
    return "Feb";
  case 3:
    return "Mar";
  case 4:
    return "Apr";
  case 5:
    return "May";
  case 6:
    return "Jun";
  case 7:
    return "Jul";
  case 8:
    return "Aug";
  case 9:
    return "Sep";
  case 10:
    return "Oct";
  case 11:
    return "Nov";
  }

  return "Dec";
}
