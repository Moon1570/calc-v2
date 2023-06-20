window.onload=function(){
    var btn = document.getElementById("myButton");
    btn.addEventListener("click", calculate, true);

}


function copy(){
    var copyText = document.getElementById("result");
    let elementText = copyText.textContent; //get the text content from the element
    navigator.clipboard.writeText(elementText);
}

function copy2(){
    var copyText1 = document.getElementById("result");
    let elementText1 = copyText1.textContent; //get the text content from the element
    var copyText = document.getElementById("allpax");
    let elementText = copyText.textContent; //get the text content from the element
    navigator.clipboard.writeText(elementText1+ ' \n' + elementText);
}


function calculate(){

    program = document.getElementById("program").value;
    miles = document.getElementById("miles").value;
    tax = document.getElementById("tax").value;
    pax = parseInt(document.getElementById("pax").value);


    // turn program to uppercase
    program = program.toUpperCase();

    console.log(program);
  //  console.log(miles);
  //  console.log(tax);
  //  console.log(pax);

    if(program == "" || miles == ""){
        document.getElementById("result").innerHTML = "Program or Miles not found";
        return;
    }

    var mcost = 0;
    if(document.getElementById(program) != null){
        var mcost = document.getElementById(program).innerText;
    } else{
        document.getElementById("result").innerHTML = "Program not found";
        return;
    }

    console.log(mcost);

    var result = parseFloat(miles) * parseFloat(mcost) * 10;



    if(tax == ""){
        document.getElementById("result").innerHTML = program + " : " + miles +"K@" +mcost+" = $" + result.toFixed(2) ; 
        document.getElementById("result2").innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <button class='btn btn-dark' id='resultcopy'>Copy</button>";

        var resulttxt = document.getElementById("resultcopy");
        resulttxt.addEventListener("click", copy, true);

        if(pax > 1){
            document.getElementById("allpax").innerHTML = program + " : " + miles*pax +"K@" +mcost+" = $" + (result*pax).toFixed(2) + " ("+pax+" PAX)";
            document.getElementById("allpax2").innerHTML = " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <button class='btn btn-dark' id='allpaxcopy'>Copy</button>";
        
            // set display tp none
            document.getElementById("resultcopy").style.display = "none";
            
            var allpax2 = document.getElementById("allpaxcopy");
            allpax2.addEventListener("click", copy2, true);
        
        }
    } else{
        document.getElementById("result").innerHTML = program + " : " + miles +"K@" +mcost+" + "+tax + " = $" + (parseFloat(tax)+result).toFixed(2) ;
        document.getElementById("result2").innerHTML = " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <button class='btn btn-dark' id='resultcopy'>Copy</button>";

        var resulttxt = document.getElementById("resultcopy");
        resulttxt.addEventListener("click", copy, true);


        if(pax > 1){
            document.getElementById("allpax").innerHTML = program + " : " + miles*pax +"K@" +mcost+" + " + (tax*pax).toFixed(2) +" = $" + ((result+parseFloat(tax))*pax).toFixed(2) + " ("+pax+" PAX)";
            document.getElementById("allpax2").innerHTML = " &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <button class='btn btn-dark' id='allpaxcopy'>Copy</button>";
        
            // set display tp none
            document.getElementById("resultcopy").style.display = "none";

            var allpax2 = document.getElementById("allpaxcopy");
            allpax2.addEventListener("click", copy2, true);
        }
    }
}

var id = '1RRMRyHNOF8u3c2vAaKKj13pWOuQUiM3IUZc4eyrqZxU';
var gid = '0';
var url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json&tq&gid='+gid;
fetch(url)
  .then(response => response.text())
  .then(data => document.getElementById("json").innerHTML=myItems(data.substring(47).slice(0, -2))  
  );
function myItems(jsonString){
  var json = JSON.parse(jsonString);
  var temp = 0;
  var table = '<table class="table table-hover table-bordered table-striped"><tr>'
  json.table.cols.forEach(colonne => table += '<th>' + colonne.label + '</th>')
  table += '</tr>'
  json.table.rows.forEach(ligne => {
    table += '<tr>'
    ligne.c.forEach((cellule, index) => {
        try{var valeur = cellule.f ? cellule.f : cellule.v}
        catch(e){var valeur = ''}
        if (index == 0) {temp = cellule.v}
        if(index ==0){table += '<td>' + valeur + '</td>'}
        if (index == 1) {table += '<td id='+ temp +'>' + valeur + '</td>'}
      }
    )
    table += '</tr>'
    }
  )
  table += '</table>'
  return table
}           
