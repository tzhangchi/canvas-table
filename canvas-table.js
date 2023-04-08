var canvasTable = {};
canvasTable.render = function (
  tableData,
  canvas,
  viewportWidth,
  viewportHeight
) {
  // Define the font style for the text in the table cells
  var font = "12px sans-serif";

  // Define the padding between cells
  var padding = 5;

  // Define the height of each table cell
  var cellHeight = 20;

  // Define the viewport and scroll positions
  var viewport = { x: 0, y: 0, width: viewportWidth, height: viewportHeight };
  var scroll = { x: 0, y: 0 };

  // Get the canvas context and set the font style
  var ctx = canvas.getContext("2d");
  ctx.font = font;

  // Calculate the cell widths based on the maximum text length in each column
  var cellWidths = [];
  for (var j = 0; j < 100; j++) {
    var maxWidth = 0;
    for (var i = 0; i < tableData.length; i++) {
      var text = String(tableData[i][j]);
      var metrics = ctx.measureText(text);
      var width = metrics.width + padding * 2;
      maxWidth = Math.max(maxWidth, width);
    }
    cellWidths[j] = maxWidth;
  }

  // Calculate the height of the table based on the number of rows and the height of each row
  var tableHeight = tableData.length * cellHeight;

  // Set the canvas width and height to match the viewport width and height
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;

  // Loop through the table data and render each cell within the visible range
  var startY = Math.floor(scroll.y / cellHeight);
  var endY = Math.min(
    Math.ceil((scroll.y + viewportHeight) / cellHeight),
    tableData.length
  );
  var startX = 0;
  var endX = 100;

  var y = startY * cellHeight - scroll.y;
  for (var i = startY; i < endY; i++) {
    var x = 0;
    for (var j = startX; j < endX; j++) {
      // Get the cell text and width
      var text = String(tableData[i][j]);
      var cellWidth = cellWidths[j];

      // Calculate the position of the cell
      var cellX = x - scroll.x;
      var cellY = y;

      // Only render the cell if it is within the viewport
      if (
        cellX + cellWidth > 0 &&
        cellX < viewport.width &&
        cellY + cellHeight > 0 &&
        cellY < viewport.height
      ) {
        // Draw the cell background
        ctx.fillStyle = "#fff";
        ctx.fillRect(
          cellX + viewport.x,
          cellY + viewport.y,
          cellWidth,
          cellHeight
        );

        // Draw the cell border
        ctx.strokeStyle = "#000";
        ctx.strokeRect(
          cellX + viewport.x,
          cellY + viewport.y,
          cellWidth,
          cellHeight
        );

        // Draw the cell text
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          text,
          cellX + cellWidth / 2 + viewport.x,
          cellY + cellHeight / 2 + viewport.y
        );
      }

      // Update the x position to the next cell
      x += cellWidth;
    }

    // Update the y position to the next row
    y += cellHeight;
  }

  // Handle scroll events to update the viewport
  canvas.addEventListener("mousewheel", handleScroll);

  function handleScroll(e) {
    // Update the scroll position of the viewport based on the canvas scroll position
    // console.log(canvas.scrollTop);
    // debugger;

    scroll.x += e.deltaX;
    scroll.y += e.deltaY;
    if (scroll.y <= 0) {
      scroll.y = 0;
    }
    if (scroll.x <= 0) {
      scroll.x = 0;
    }

    console.log(scroll);
    // Calculate the visible range of cells based on the current scroll position and viewport size
    var startY = Math.floor(scroll.y / cellHeight);
    var endY = Math.min(
      Math.ceil((scroll.y + viewportHeight) / cellHeight),
      tableData.length
    );
    var startX = 0;
    var endX = 100;

    // Clear the canvas and render only the cells within the visible range
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var y = startY * cellHeight - scroll.y;
    for (var i = startY; i < endY; i++) {
      var x = 0;
      for (var j = startX; j < endX; j++) {
        // Get the cell text and width
        var text = String(tableData[i][j]);
        var cellWidth = cellWidths[j];

        // Calculate the position of the cell
        var cellX = x - scroll.x;
        var cellY = y;

        // Only render the cell if it is within the viewport
        if (
          cellX + cellWidth > 0 &&
          cellX < viewport.width &&
          cellY + cellHeight > 0 &&
          cellY < viewport.height
        ) {
          // Draw the cell background
          ctx.fillStyle = "#fff";
          ctx.fillRect(
            cellX + viewport.x,
            cellY + viewport.y,
            cellWidth,
            cellHeight
          );

          // Draw the cell border
          ctx.strokeStyle = "#000";
          ctx.strokeRect(
            cellX + viewport.x,
            cellY + viewport.y,
            cellWidth,
            cellHeight
          );

          // Draw the cell text
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            text,
            cellX + cellWidth / 2 + viewport.x,
            cellY + cellHeight / 2 + viewport.y
          );
        }

        // Update the x position to the next cell
        x += cellWidth;
      }

      // Update the y position to the next row
      y += cellHeight;
    }
  }
};

//This version of the `render` function calculates the width and height of each table cell based on the contents of the cell, and then positions and sizes the cells within the viewport accordingly. The function also handles scroll events to update the viewport as needed, allowing the user to scroll smoothly through the table data.
