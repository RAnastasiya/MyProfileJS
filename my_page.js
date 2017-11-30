var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlMDJlNDYxODhjYzExZDg0N2Y1Mzg5MmFjMTkxOTcwZjI0NmE5NWU5ZGI3ZTVlZjliY2RlZTliYjg2MTQ4MGYyYTA3NjcwM2ZjNGE3ZTIwIn0.eyJhdWQiOiIxMCIsImp0aSI6ImVlMDJlNDYxODhjYzExZDg0N2Y1Mzg5MmFjMTkxOTcwZjI0NmE5NWU5ZGI3ZTVlZjliY2RlZTliYjg2MTQ4MGYyYTA3NjcwM2ZjNGE3ZTIwIiwiaWF0IjoxNTA5NjQyNjkwLCJuYmYiOjE1MDk2NDI2OTAsImV4cCI6MTgyNTE3NTQ5MCwic3ViIjoiNzc2Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.L-sws3bNcvKtRg1PKyY6PqeM7FwRAW-uvLCRAqOp4C639v_iJ9YMy5l6bOuJqeH1yrOwz6fPjRsbRzXWzX_x-l6nb7kH098a17QN_rzh_CVjfApG6_OIs_6g9GepJeVZ3j87lDRC5TKZsI4HyOYw24TuQ-uVd9jAJAkBTGhJtuaKSumZKt-hUu6tPTHESjIpiBYXxe8QkJVYkr5ZZBEFtuJkGgyh2Wh0DHvD5cdmsJe9rXVVXktAMaAqbOAWVXbkrN5t67ZP-mfCA6wPzJ2LeB5lmnJEmB3CvsWWQDjBO6rGpmRzuy-5MbfuQUI3iBjERg4ZZBcbqmFSaKOt8yVFGSOV8LDbHiYGWvj0sUVJS5fPCptuMVdFFRVv2sRBHxNFdczoWmA-sqQ3OeHGrB-8JiR4rf92Q9zCcMW42Zo0T4BQ7U8iRQWBP6ffWwj0gyf4kKPUQrMxallBcnYoclvwxqN5TAUQQ823jHomQGHVD9A_aWy_uhDP97ltybG6mM8M08JLk5yDm72t65dRlv7GrESm4ARz3UQNgoqpUqTG44WUuynpqSHGwv62lRQzTPC0T11C9-EznAoswGbpJpODDYf52bp7XN6ILjYMIlvH7920GQ9s-agYyvh3thO9c3ZNIYwShJBE6G-RQoJgVbinyWJp1fuB9xkf8haL6Z2a2oc';
var myId = 776;
var client = new INTITAClient({
  key: API_KEY,
});
client.getUserDetails(myId, function (error, data) {
  console.log(data);
  document.getElementById('avatar').src = data.avatar;
  document.getElementById('firstName').innerHTML = data.firstName + " " + data.secondName;
  var elem = document.querySelector('#inform');
  var list = [
    data.address,
    data.city,
    data.email,
    data.phone
  ];
  for (var i = 0; i < list.length; i++) {
    var p = document.createElement("p");
    elem.appendChild(p);
    p.innerHTML  = list[i];
  }

//    console.log(error, data)
});

client.getUserCoursesAndModules(myId, function (error, data) {
  //console.log(data);
  data.courses.forEach(function (element){
    var id = element.id;
    var elem = document.querySelector('#courses > div > div > div');
    client.getCourseInfo(id, function (error, data) {
      var sect = document.createElement("section");
      var el_span = document.createElement("span");
      el_span.className = "icon featured fa-comments-o";
      var h3 = document.createElement("h3");
      sect.className = "box style1 {id}".replace('{id}', id);
      sect.appendChild(el_span);
      sect.appendChild(h3);
      h3.innerHTML  = data.title_en;  // Web developer (PHP)
      var list = [
        data.for_whom_en,
        data.what_you_learn_en,
        data.what_you_get_en
      ];
      for (var i = 0; i < list.length; i++) {
        var p = document.createElement("p");
        sect.appendChild(p);
        p.innerHTML  = list[i];
      }
      elem.appendChild(sect);
    });

    var elemModule = document.querySelector('#modules > div');
    var index_row = 0;
    client.getCourseModules(id, function (error, modules) {
      var div_row = document.createElement("div");
      div_row.className = "row";
      if ((index_row % 3) == 0){
        elemModule.appendChild(div_row);
      }
      modules.forEach(function (module){
//        console.log(module);
        //console.log((index_row % 4) == 0);
        var div = document.createElement("div");
        div.className = "6u 12u(mobile)";
        var article = document.createElement("article");
        article.className = "box style2";
        var h3 = document.createElement("h3");
        var p = document.createElement("p");
        var a = document.createElement("a");
        a.setAttribute('href', '#');
        article.appendChild(h3);
        h3.appendChild(a);
        client.getModuleInfo(module.id, function (error, mInfo) {
          // console.log(mInfo);
          var title_module = mInfo.title_en;
          if (title_module == ''){
            title_module = mInfo.title_ru;
          }
          a.innerHTML = title_module;
          p.innerHTML = "Level " +  mInfo.level;

        });
        client.getModuleLectures(module.id, function(error, lectures) {
          var list = [];
          lectures.forEach(function (lecture){
              list.push(lecture.title);
              list.push('\n');
          });
          a.setAttribute('title', list);
        });
        article.appendChild(p);
        div.appendChild(article);
        div_row.appendChild(div);
        index_row++;
      });
    });
  });
});
/*
client.getModuleTags(1, function(error, data) {
  console.log(error, data);
});
client.getCourseTags(1, function(error, data) {
  console.log(error, data);
});
*/
