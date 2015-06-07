//Create Donutshops
function DonutShop(name, minC, maxC, avgD, hourOp) {
  this.name = name;
  this.minC = minC;
  this.maxC = maxC;
  this.avgD = avgD;
  this.hourOp = hourOp;

  /*
  this.customer = function(maxC, minC) {
    var random = Math.floor(Math.random() * (maxC - minC + 1) + minC);
    return random;
  };
  */

  this.getDonutsPerHour = function() {
    this.bakeHour = Math.floor((Math.floor(Math.random() * (maxC - minC + 1) + minC)) * this.avgD);
    return this.bakeHour;
  };

  this.getDonutsPerDay = function() {
    this.bakeDay = Math.floor(this.getDonutsPerHour() * this.hourOp);
    return this.bakeDay;
  };
}


// DonutMaster
function DonutMaster() {
  this.donutShopList = [];
  this.addShop = function(name, minC, maxC, avgD, hourOp) {
    var donutShop = new DonutShop(name, minC, maxC, avgD, hourOp);
    this.donutShopList.push(donutShop);
  };

  // Make report display in window
  this.makeReport = function() {
    for (var i = 0; i < this.donutShopList.length; i++) {
      this.donutShopList[i].getDonutsPerDay();
      $("tbody").append("<tr id='" + i + "'></tr>");
      $("#" + i).append("<th id='shop" + i + "''>" + this.donutShopList[i].name + "</th>");
      $("#" + i).append("<td id='hour" + i + "''>" + this.donutShopList[i].bakeHour + "</td>");
      $("#" + i).append("<td id='day" + i + "''>" + this.donutShopList[i].bakeDay + "</td>");

    }
  };

  this.generateReport = function() {
  //loops through the list of DonutShops and output location/donutperhour/donutperday //
    for (var i = 0; i < this.donutShopList.length; i++) {
      console.log("The " + this.donutShopList[i].name + " shop needs to bake " + this.donutShopList[i].bakeHour + " donuts per hour and " + this.donutShopList[i].bakeDay + " donuts per day.");
    }
  };

  this.addShopForm = function() {
    // for(var i = 0; i < 1; i++) {
      $("form").attr('id', 'newDonutShop');
      $("form").append("<input type='text' id='shopName' name='shopName' placeholder='new shop name'>" + "</input>");
      $("form").append("<input type='text' id='minC' name='minC' placeholder='minimum customers/hr'>" + "</input>");
      $("form").append("<input type='text' id='maxC' name='maxC' placeholder='max customers/hr'>" + "</input>");
      $("form").append("<input type='text' id='avgD' name='avgD' placeholder='avg donuts/person'>" + "</input>");
      $("form").append("<input type='text' id='hourOp' name='hourOp' placeholder='hours of operation'>" + "</input>");
      $("form").append("<input type='submit' id='addButton' value='Add Shop'>" + "</input>");
    // }

  $('#newDonutShop').on('submit', function(evt) {
    evt.preventDefault();
    var name = $("input[name=shopName]").val();
    var minC = $("input[name=minC]").val();
    var maxC = $("input[name=maxC]").val();
    var avgD = $("input[name=avgD]").val();
    var hourOp = $("input[name=hourOp]").val();

  donutMaster.addShop(name, minC, maxC, avgD, hourOp);
  console.log(donutMaster.donutShopList);

  for(var i = 0; i < donutMaster.donutShopList.length; i++){
    if(donutMaster.donutShopList[i].name === name){
      donutMaster.donutShopList[i].getDonutsPerDay();
      $("tbody").append("<tr id='" + i + "'></tr>");
      $("#" + i).append("<th id='shop" + i + "''>" + donutMaster.donutShopList[i].name + "</th>");
      $("#" + i).append("<td id='hour" + i + "''>" + donutMaster.donutShopList[i].bakeHour + "</td>");
      $("#" + i).append("<td id='day" + i + "''>" + donutMaster.donutShopList[i].bakeDay + "</td>");
    }
  }

  $("input[name=shopName]").val('');
  $("input[name=minC]").val('');
  $("input[name=maxC]").val('');
  $("input[name=avgD]").val('');
  $("input[name=hourOp]").val('');

});

  }

};

// jQuery for New DonutShop Form


//I moved the submit event out of the DonutMaster contructor and added its own append, otherwise
//all of the shops get appended again when the new shop is appended.


var donutMaster = new DonutMaster();

donutMaster.addShop("Capitol Hill", 4, 37, 2.00, 24);
donutMaster.addShop("Downtown", 8, 43, 4.50, 8);
donutMaster.addShop("South Lake Union", 9, 23, 6.33, 10);
donutMaster.addShop("Wedgewood", 2, 28, 1.25, 7);
donutMaster.addShop("Ballard", 8, 58, 3.75, 10);
donutMaster.addShop("Wallingford", 4, 10, 2, 6);

donutMaster.makeReport();
donutMaster.generateReport();
donutMaster.addShopForm();


// // Hover for CSS color change
// $("tbody th").hover(function() {
//   $(this).css("color", "#c2f2d0");
//   }, function() {
//   $(this).css("color", "#fdf5c9");
// };



