mainColor = "#4294FF";
highlightColor = "#E6ECFF";

fetch("/data/data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("Full data:", data); // This will log the JSON data to the console
    // Group by 'score' and count the records
    var groupedDataByScore = groupData(data, "Score");
    drawHorizontalBarChart(
      "#score-chart",
      groupedDataByScore,
      "Score",
      "Count"
    );

    // Output the result
    console.log("Group by score:", groupedDataByScore);

    // Group by 'roberta label' and count the records
    // Convert the grouped data back to an array of objects
    var groupedDataByRoberta = groupData(data, "roberta_label");
    drawHorizontalBarChart(
      "#roberta-chart",
      groupedDataByRoberta,
      "roberta_label",
      "Count"
    );

    // Output the result
    console.log("Group by roberta label:", groupedDataByRoberta);

    // Group by 'score' and count the records
    var groupedDataByVader = groupData(data, "vader_label");
    drawHorizontalBarChart(
      "#vader-chart",
      groupedDataByVader,
      "vader_label",
      "Count"
    );

    // Output the result
    console.log("Group by vader label:", groupedDataByVader);

    //Comboboxes
    let selectedCriteria = "vader_neg";
    let selectedDirection = "desc";
    
    var filtered_data = data;


    let comboboxSortCriteria = d3.select("#sortCriteria");
    comboboxSortCriteria.on("change", function () {
      // Get the selected value
      selectedCriteria = d3.select(this).property("value");
      console.log("Selected Sort Criteria: ", selectedCriteria);
      console.log("Selected direction: ", selectedDirection);
      filtered_data.sort(function (a, b) {
        if (selectedDirection == "asc") {
          return a[selectedCriteria] - b[selectedCriteria];
        } else {
          return b[selectedCriteria] - a[selectedCriteria];
        }
      });
      console.log(filtered_data);
      drawList(filtered_data);
    });

    let comboboxDirection = d3.select("#selectDirection");
    comboboxDirection.on("change", function () {
      // Get the selected value
      selectedDirection = d3.select(this).property("value");
      console.log("Selected Sort Criteria: ", selectedCriteria);
      console.log("Selected direction: ", selectedDirection);

      filtered_data.sort(function (a, b) {
        if (selectedDirection == "asc") {
          return a[selectedCriteria] - b[selectedCriteria];
        } else {
          return b[selectedCriteria] - a[selectedCriteria];
        }
      });
      console.log(filtered_data);
      drawList(filtered_data);
    });

    // On Click function on score barchart
    let selectedScore = null;

    for (let i = 1; i < 6; i++) {
      let bar = d3.select("#ID" + i);
      bar.on("click", function () {
        let svgScoreChart = d3.select("#score-chart");
        if (selectedScore == i) {
          svgScoreChart.selectAll("rect").attr("fill", mainColor);
          selectedScore = null;

          drawHorizontalBarChart(
            "#roberta-chart",
            groupedDataByRoberta,
            "roberta_label",
            "Count"
          );

          drawHorizontalBarChart(
            "#vader-chart",
            groupedDataByVader,
            "vader_label",
            "Count"
          );
          drawList(data);
        } else {
          selectedScore = i;
          svgScoreChart.selectAll("rect").attr("fill", mainColor);
          bar.attr("fill", highlightColor);
          filtered_data = data.filter((d) => d["Score"] === i);
          console.log(filtered_data);
          drawHorizontalBarChart(
            "#roberta-chart",
            groupData(filtered_data, "roberta_label"),
            "roberta_label",
            "Count"
          );

          drawHorizontalBarChart(
            "#vader-chart",
            groupData(filtered_data, "vader_label"),
            "vader_label",
            "Count"
          );
          drawList(filtered_data);
        }
      });
    }

    drawList(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
