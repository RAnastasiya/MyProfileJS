

var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlMDJlNDYxODhjYzExZDg0N2Y1Mzg5MmFjMTkxOTcwZjI0NmE5NWU5ZGI3ZTVlZjliY2RlZTliYjg2MTQ4MGYyYTA3NjcwM2ZjNGE3ZTIwIn0.eyJhdWQiOiIxMCIsImp0aSI6ImVlMDJlNDYxODhjYzExZDg0N2Y1Mzg5MmFjMTkxOTcwZjI0NmE5NWU5ZGI3ZTVlZjliY2RlZTliYjg2MTQ4MGYyYTA3NjcwM2ZjNGE3ZTIwIiwiaWF0IjoxNTA5NjQyNjkwLCJuYmYiOjE1MDk2NDI2OTAsImV4cCI6MTgyNTE3NTQ5MCwic3ViIjoiNzc2Iiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.L-sws3bNcvKtRg1PKyY6PqeM7FwRAW-uvLCRAqOp4C639v_iJ9YMy5l6bOuJqeH1yrOwz6fPjRsbRzXWzX_x-l6nb7kH098a17QN_rzh_CVjfApG6_OIs_6g9GepJeVZ3j87lDRC5TKZsI4HyOYw24TuQ-uVd9jAJAkBTGhJtuaKSumZKt-hUu6tPTHESjIpiBYXxe8QkJVYkr5ZZBEFtuJkGgyh2Wh0DHvD5cdmsJe9rXVVXktAMaAqbOAWVXbkrN5t67ZP-mfCA6wPzJ2LeB5lmnJEmB3CvsWWQDjBO6rGpmRzuy-5MbfuQUI3iBjERg4ZZBcbqmFSaKOt8yVFGSOV8LDbHiYGWvj0sUVJS5fPCptuMVdFFRVv2sRBHxNFdczoWmA-sqQ3OeHGrB-8JiR4rf92Q9zCcMW42Zo0T4BQ7U8iRQWBP6ffWwj0gyf4kKPUQrMxallBcnYoclvwxqN5TAUQQ823jHomQGHVD9A_aWy_uhDP97ltybG6mM8M08JLk5yDm72t65dRlv7GrESm4ARz3UQNgoqpUqTG44WUuynpqSHGwv62lRQzTPC0T11C9-EznAoswGbpJpODDYf52bp7XN6ILjYMIlvH7920GQ9s-agYyvh3thO9c3ZNIYwShJBE6G-RQoJgVbinyWJp1fuB9xkf8haL6Z2a2oc';
var myId = 776;
var client = new INTITAClient({
  key: API_KEY,
});
client.getUserDetails(myId, function (error, data) {
  console.log(data);
  document.getElementById('avatar').src = data.avatar;
  document.getElementById('firstName').innerHTML = data.firstName + " " + data.secondName;
//    console.log(error, data)
});

client.getUserCoursesAndModules(myId, function (error, data) {
  console.log(data);
  data.courses.forEach(function (element){
    var id = element.id;
    client.getCourseInfo(id, function (error, data) {
      var elements = document.querySelectorAll('#work > div > div > div:nth-child(1) > section > h3')
      elements[0].innerHTML  = data.title_en;
      var list = [
        data.for_whom_en,
        data.what_you_learn_en,
        data.what_you_get_en
      ];
      var elements = document.querySelectorAll('#work > div > div > div:nth-child(1) > section > p')
      for (var i = 0, ln = list.length; i < ln; i++) {
        elements[i].innerHTML  = list[i];
      }
    });
    client.getCourseModules(id, function (error, data) {
      console.log(error, data);
      console.log(typeof(data));
      //console.log("data.length", data.length);
      data.forEach(function (element){
        console.log("data.length", element);
      });
    });
  });
});




/*
client.getModuleInfo(17, function (error, data) {
  console.log(error, data)
});


client.getModuleTags(1, function(error, data) {
  console.log(error, data);
});
client.getModuleLectures(1, function(error, data) {
  console.log(error, data);
});



client.getCourseTags(1, function(error, data) {
  console.log(error, data);
});
*/
