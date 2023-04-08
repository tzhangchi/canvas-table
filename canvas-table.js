var canvasTable = {};
canvasTable.render = function (
  tableData,
  canvas,
  viewportWidth,
  viewportHeight
) {
  // Define the viewport and scroll positions
  var viewport = { x: 0, y: 0, width: 0, height: 0 };
  var scroll = { x: 0, y: 0 };
  // Get the canvas context and set the font style
  var ctx = canvas.getContext("2d");

  // Define the font style for the text in the table cells
  var font = "12px sans-serif";
  ctx.font = font;
  // Define the padding between cells
  var padding = 5;

  // Define the height of each table cell
  var cellHeight = 20;
  // Calculate the width and height of each table cell based on the contents of the cell
  var cellWidths = [];
  var cellHeights = [];
  for (var i = 0; i < tableData.length; i++) {
    cellHeights[i] = cellHeight;
    for (var j = 0; j < 100; j++) {
      var text = String(tableData[i][j]);
      var metrics = ctx.measureText(text);
      var cellWidth = metrics.width + padding * 2;
      if (cellWidths[j] == null || cellWidth > cellWidths[j]) {
        cellWidths[j] = cellWidth;
      }
    }
  }

  // Calculate the total width and height of the table based on the cell widths and heights
  var totalWidth = 0;
  var totalHeight = 0;
  for (var i = 0; i < tableData.length; i++) {
    totalHeight += cellHeights[i];
  }
  for (var j = 0; j < 100; j++) {
    totalWidth += cellWidths[j];
  }

  // Set the canvas width and height to match the viewport
  canvas.width = viewportWidth;
  canvas.height = viewportHeight;

  // Set the viewport size and position
  viewport.width = viewportWidth;
  viewport.height = viewportHeight;
  viewport.x = 0;
  viewport.y = 0;

  // Draw the table within the viewport
  updateViewport();

  // Handle scroll events to update the viewport
  canvas.addEventListener("scroll", handleScroll);

  function updateViewport() {
    // Clear the canvas and set the font style
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = font;

    // Loop through the table data and render each cell within the viewport
    var y = 0;
    for (var i = 0; i < tableData.length; i++) {
      var x = 0;
      for (var j = 0; j < 100; j++) {
        // Get the cell text and width
        var text = String(tableData[i][j]);
        var cellWidth = cellWidths[j];
        var cellHeight = cellHeights[i];

        // Calculate the position of the cell
        var cellX = x - scroll.x;
        var cellY = y - scroll.y;

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
          ctx.fillText(
            text,
            cellX + cellWidth / 2 + viewport.x,
            cellY + cellHeight / 2 + viewport.y
          );
        }

        // Update the x position to the next cell
        x += cellWidth;
      }

      // Update the y position
      // Update the y position to the next row
      y += cellHeight;
    }
  }

  function handleScroll() {
    // Update the scroll position of the viewport based on the canvas scroll position
    scroll.x = canvas.scrollLeft;
    scroll.y = canvas.scrollTop;

    // Update the viewport based on the new scroll position
    updateViewport();
  }
};

//This version of the `render` function calculates the width and height of each table cell based on the contents of the cell, and then positions and sizes the cells within the viewport accordingly. The function also handles scroll events to update the viewport as needed, allowing the user to scroll smoothly through the table data.
