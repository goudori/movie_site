/* TMDBのAPIキー */
const APIKEY = "7a14a0e5c3bfc634d2dac4546734ee28";
const URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
  APIKEY +
  "&language=ja-JP&page=";

const imgurl = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

let page_number = 1;
let max_page = 0;

$(function () {
  input_json_data();
  $(document).on("click", "#prev-button", function () {
    page_number--;
    input_json_data();
  });
  $(document).on("click", "#next-button", function () {
    page_number++;
    input_json_data();
  });
});
function input_json_data() {
  $.ajax({
    url: URL + page_number,
    type: "GET",
    dataType: "json",
    success: function (data, textStatus) {
      // 成功時の処理
      console.log("JSONデータの読み込みに成功しました。", data);
      max_page = data.total_pages;
      input_data(data.results);
      next_botton();
    },
    error: function (xhr, textStatus, errorThrown) {
      // エラー時の処理
      console.error("JSONデータの読み込みに失敗しました。", errorThrown);
      // エラー内容を分かりやすく表示
      alert("エラーが発生しました。詳細はコンソールログを確認してください。");
      // 具体的なエラー内容をコンソールログに出力
      console.error(xhr.status, textStatus, errorThrown);
    },
  });
}

function input_data(results) {
  $(".main").empty();
  for (let i = 0; i < results.length; i++) {
    let data = results[i];
    $(".main").append("<div class='movie_" + i + " poster'></div>");
    $(".movie_" + i).append("<h3>" + data["title"] + "</h3>");
    $(".movie_" + i).append(
      "<img src='" + imgurl + data["backdrop_path"] + "'>"
    );
  }
}
function next_botton() {
  if (page_number > 1) {
    $(".navigation-top").css("opacity", "100");
  } else {
    $(".navigation-top").css("opacity", "0");
  }
  if (page_number < max_page) {
    $(".navigation-bottom").css("opacity", "100");
  } else {
    $(".navigation-bottom").css("opacity", "0");
  }
}
