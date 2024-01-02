const buildRequestUrl = (easiConnectUrl, params) => {
  return `${easiConnectUrl}/webforms/2.0/script/1.0/${params.solutionId}/${params.formId}/${params.language}.js`;
};

export function create(params) {
  const easiConnectUrl = params.easiwareScriptUrl;

  const formFetchData = params;

  if (!formFetchData.elementToBuildIn) {
    throw new Error("No element selected for Easiware form");
  }

  const targetElementForForm = document.getElementById(
    formFetchData.elementToBuildIn
  );

  if (params.callback && typeof params.callback === "function") {
    window["fn_callback_easiwebform" + params.formId + params.solutionId] =
      params.callback;
  }

  targetElementForForm.innerHTML = `
    <div id="easiformarea" />
    <div class="easiformWaiting" id="easiformWaiting">
      <div class="easiformWaitingCont" id="easiformWaitingCont">
        <div class="easiformWaitingMsg" id="easiformWaitingMsg" />
      </div>
    </div>
  `;
  targetElementForForm.innerHTML +=
    "<div id=\"easiformarea\"></div>" +
    "<div class=\"easiformWaiting\" id=\"easiformWaiting\">" +
    "<div class=\"easiformWaitingCont\" id=\"easiformWaitingCont\"><div class=\"easiformWaitingMsg\" id=\"easiformWaitingMsg\"></div></div>" +
    `<style type="text/css">
      #test {
    color: red;
  }

  /*Style globale appliqué sur la zone qui encapsule le formulaire*/
#easiformarea {
    margin: 20px;
}

/*Style générique pour les balises span et div de la zone easiformarea*/
#easiformarea > form > div {
    position: relative;
    display: table;
    margin-bottom: 15px;
}
#easiformarea span {
    display: table-cell;
    vertical-align: top;
    color : #c561bb;
}
#easiformarea span:first-child {
    width: 180px;
}

/*Style pour les titre et les libellés des champs*/
#easiformarea label {
    font: 0.88889em / 32px "Avenir45Book", Arial, Verdana, Helvetica, sans-serif;
    text-transform: uppercase;
}

.easifilefieldlabel {
    text-transform: inherit !important;
    color: black !important;
}

.easifilefielderrormessage {
color: #f2679e !important;
}

/*Style du champs de type text, liste déroulante et bloc de text*/
#easiformarea input[type="text"],
#easiformarea input[type="number"],
#easiformarea select,
#easiformarea textarea {
    width: 340px;
    border: 1px solid #bbb;
    color: #574d4d;
    font: 0.88889em "Avenir35Light", Arial, Verdana, Helvetica, sans-serif;
    padding: 0 5px;
}
#easiformarea input[type="text"],
#easiformarea select {
    height: 32px;
    line-height: 32px;
}
#easiformarea textarea {
    height: 200px;
}
/*Style appliqué à l'étoile des champs obligatoires*/
#easiformarea .mandatory {
    position: absolute;
    left: -10px;
    top: 5px;
    color: #e74890;
}

/*Style appliqué au bouton de validation du formulaire*/
#easiformarea .validatebutton {
    color: #fff;
    display: inline-block;
    font: 1.11111em/38px "Avenir35Light", Arial, Verdana, Helvetica, sans-serif;
    height: 42px;
    padding: 0 40px 0 40px;
    position: relative;
    background: #e74890;
    border: none;
    margin-right: 290px;
    cursor:pointer;
    margin-top: 10px;
}
#easiformarea .validatebutton:after {
    font-size: 0.8em;
    height: 16px;
    background-color: #dedede;
}
#easiformarea .validatebutton:hover {
    background: #f2006d;
}

#easiformarea .validatebutton:disabled {
    background: #574d4d;
    cursor: unset;
}

#easiformarea .disabled-validatebutton {
    background: #574d4d !important;
}

/*Style appliqué la zone expliquant l'obligation sur les dits champs obligatoires*/
#easiformarea .mandatoryfieldmention {
    color: #4a4a4a;
    font: 0.66667em "Avenir35Light", Arial, Verdana, Helvetica, sans-serif;
    margin-bottom: 20px;
    text-transform: uppercase;
}

/*Style appliqué sur le sablier après la saisie du formulaire*/
#easiformWaiting {
    display: none;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba( 255, 255, 255, .8) 50% 50% no-repeat;
}

.easiformWaitingCont {
    width: 100%;
    height: 100%;
    display: table;
}

/*Style appliqué au message d'attente en dessous du sablier */
.easiformWaitingMsg {
    color: #000000;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    padding-top: 5%; }

/*Style appliqué à la zone globale qui encapsule les propositions de la base de connaissance */
#easiformKBzone {
    border-bottom: 1px solid #dedede;
    width: 520px;
    font: 0.88889em / 32px "Avenir45Book", Arial, Verdana, Helvetica, sans-serif;
    text-transform: uppercase;
    color : #c561bb;
    margin-bottom: 0px;
}

/*Style appliqué à la zone qui encapsule que les articles proposés*/
.easiformKBZoneArticle{
    /*border-bottom: 1px solid #dedede;*/
    background-color: rgba(240, 214, 237, 1);
    cursor: pointer;
    font-family: sans-serif;
    font-size: 8pt;
    color: #574d4d;
    width: 100%;
    padding-left: 5px;
    margin-bottom: 5px;
}

/*Style appliqué à chaque titre de  la base*/
.easiformKBZoneTitle {
    color : #c561bb;
    font: 0.88889em / 32px "Avenir45Book", Arial, Verdana, Helvetica, sans-serif;
    text-transform: uppercase;
}

/*Style appliqué à la zone affichant le message d'information supplémentaire*/
#easiformarea .additionnalInformation {
 margin-bottom: 20px;
}
#easiformarea .additionnalInformation span {
    width: 100%;
}
.easitoolTipButton {
    padding-left: 10px !important;
    padding-top: 5px;
    cursor: help !important;
    margin-right: 30px;
}

.easitoolTipButton .easitoolTipText {
    visibility: hidden;
    width: 120px;
    background-color: #574d4d;
    color: #fff !important;
    /*text-align: center;*/
    border-radius: 6px;
    padding: 5px 0;
    font: 0.88889em / 32px "Avenir45Book", Arial, Verdana, Helvetica, sans-serif;
    padding : 5px 0 5px 10px;
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
}

.easitoolTipButton:hover .easitoolTipText {
    visibility: visible;
}

@-webkit-keyframes easirotating {
    from{
        -webkit-transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
    }
}

.easirotating {
    -webkit-animation: easirotating 2s linear infinite;
}
    </style>` +
    "</div>";

  const asyncScript = document.createElement("script");
  asyncScript.type = "text/javascript";
  asyncScript.src = buildRequestUrl(easiConnectUrl, params);
  targetElementForForm.appendChild(asyncScript);
}
