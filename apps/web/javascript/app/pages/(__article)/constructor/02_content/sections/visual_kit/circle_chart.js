export function Build_Circle_Chart(_chart_title, _circle_chart_txt) {
    // _circle_chart_txt: "100•80/Global Population•Facebook Users"
    // _chart_title: "Título"

    let arr_chart = _circle_chart_txt.split('/'); // ["100•80", "Global Population•Facebook Users"]

    console.log(_circle_chart_txt);
    let arr_values = arr_chart[0].split('•'); // ["100", "80"]
    let arr_tags = arr_chart[1].split('•'); // ["Global Population", "Facebook Users"]

    let bg_value = arr_values[0]; // "100"
    let fill_value = arr_values[1]; // "80"

    let bg_tag = arr_tags[0]; // "Global Population"
    let fill_tag = arr_tags[1]; // "Facebook Users"

    let percentage = (fill_value * 100) / bg_value; // 80

    // prettier-ignore
    let html_circle_chart =
        '<pre class="circle_chart_container">' +

            '<p class="chart_title">' + _chart_title + '</p>' +

            '<div class="chart_and_information_container">' +

                '<figure class="chart">' +
                    '<div class="middle_information">' +
                        '<p>' + ~~percentage + '%</p>' +
                    '</div>' +
                    '<svg>' +
                        '<circle class="background"></circle>' +
                        '<circle class="fill" style="--percentage: ' + percentage + '"></circle>' +
                    '</svg>' +
                '</figure>' +

                '<ul class="chart_information">' +
                    '<li class="background">' +
                        '<p class="name">' + bg_tag + '</p>' +
                        '<p class="value">' + bg_value + '</p>' +
                    '</li>' +
                    '<li class="fill">' +
                        '<p class="name">' + fill_tag + '</p>' +
                        '<p class="value">' + fill_value + '</p>' +
                    '</li>' +
                '</ul>' +

            '</div>' +

        '</pre>';

    return html_circle_chart;
}
