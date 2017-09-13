
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
  TemplateData.MainPageLink =   "./project.html?p=" + projData.projectID;
  TemplateData.SummaryString =  mdParser.makeHtml(projData.summaryMd + " ... [Read More](" + TemplateData.MainPageLink + ")");
  TemplateData.SummaryStringMain =  mdParser.makeHtml(projData.summaryMd);
  TemplateData.projData =       projData;

  return TemplateData;
}

function GenerateProjectHTMLBlob(projData, imgLeft = true)
{
  var TemplateData = MakeTemplateData(projData);

  var ImgLTemplate = "<div class=\"blob\">\
                        <div class=\"row\">\
                          <a href=\"{{MainPageLink}}\" class=\"col-md-12 visible-xs visible-sm discrete-link\">\
                            <h1>{{projData.projectName}} ({{YearString}})</h1>\
                            {{&LabelsString}}<br/>\
                          </a>\
                          <a href=\"{{MainPageLink}}\" class=\"col-md-3\">\
                            <div class=\"fader hidden-xs hidden-sm\"></div>\
                            <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </a>\
                          <div class=\"col-md-9\">\
                            <a href=\"{{MainPageLink}}\" class=\"hidden-xs hidden-sm discrete-link\">\
                              <h1>{{projData.projectName}}\
                              {{&LabelsString}}</h1>\
                              <p>{{YearString}}</p></a>\
                            </a>\
                            {{&SummaryString}}\
                            <span class=\"visible-xs visible-sm\" style = \"margin-top:50px;\"></span>\
                          </div>\
                        </div>\
                      </div>";

  var ImgRTemplate = "<div class=\"blob\">\
                        <div class=\"row\">\
                          <a href=\"{{MainPageLink}}\" class=\"col-md-12 visible-xs visible-sm discrete-link\">\
                            <h1>{{projData.projectName}} ({{YearString}})</h1>\
                            {{&LabelsString}}<br/>\
                          </a>\
                          <a href=\"{{MainPageLink}}\" class=\"col-md-3 visible-xs visible-sm\">\
                              <div class=\"fadel hidden-xs hidden-sm\"></div>\
                              <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </a>\
                          <div class=\"col-md-9\" style=\"padding-left:20px;\">\
                            <a href=\"{{MainPageLink}}\"  class=\"hidden-xs hidden-sm discrete-link\">\
                              <h1>{{projData.projectName}}\
                              {{&LabelsString}}</h1>\
                              <p>{{YearString}}</p>\
                            </a>\
                            {{&SummaryString}}\
                            <span class=\"visible-xs visible-sm\" style = \"margin-top:50px;\"></span>\
                          </div>\
                          <a href=\"{{MainPageLink}}\" class=\"col-md-3 hidden-xs hidden-sm\">\
                              <div class=\"fadel hidden-xs hidden-sm\"></div>\
                              <img src = \"./resources/image/{{projData.summaryImage}}\" width=\"100%\" class=\"profile-img\"/>\
                          </a>\
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
