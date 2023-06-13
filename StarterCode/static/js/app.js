const navellink = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
d3.json(navellink).then(function(data) {
    console.log(data);
  });
const json=d3.json(navellink);
console.log(json);  
const dataset=json.samples;
console.log(dataset);
dropdownMenu=d3.select("#selDataset");



console.log(dataset);

function init() {
    d3.json(navellink).then(function(data) {
        let options=data.names;
        let dataset = data.samples;
          for (var i=0; i < options.length; i++) {
           dropdownMenu.append('option').text(options[i]).property('value',i)
        }
    
    let selection = 940;
    let personID = 1;
    let persondata = dataset[1];
    let top10ids= persondata.otu_ids.slice(0, 10);
    let top10numbers= persondata.sample_values.slice(0, 10);
    let top10labels= persondata.otu_labels.slice(0, 10);
    let trace1 = {
        y: top10ids,
        x: top10numbers,
        text: top10ids,
        name: `Top 10 OTUs for Individual ${selection}`,
        type: "bar",
        orientation: "h",
                };
    let traceData = [trace1]
    let layout = {
        title: `Top 10 OTUs for Individual ${selection}`,
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
            }
        };
    Plotly.newPlot("bar", traceData, layout);
});
};

init();

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);


// This function is called when a dropdown menu item is selected
function updatePlotly() {
    d3.json(navellink).then(function(data) {
        let options=data.names;
        let dataset = data.samples;
          for (var i=0; i < options.length; i++) {
           dropdownMenu.append('option').text(options[i]).property('value',i)
        }
    
    
  // Use D3 to select the dropdown menu
  selection = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  personID = selection.property("value");
  persondata = dataset[personID]

    // Use D3 to select the dropdown menu

    let top10ids= persondata.otu_ids.slice(0, 10);
    let top10numbers= persondata.sample_values.slice(0, 10);
    let top10labels= persondata.otu_labels.slice(0, 10);
    let update = {
        x: top10ids,
        y: top10numbers,
        text: top10labels,
        name: "Top 10 OTUs for Individual ${selection}",
      };
      Plotly.restyle('bar',update)

    // Assign the value of the dropdown menu option to a variable
  
});};
  


