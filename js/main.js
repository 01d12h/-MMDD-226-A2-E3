document.addEventListener("DOMContentLoaded", () => {
  // Currently selected lamp ID (1-6)
  let currentProductId = 1;

  // DOM elements
  const productCards = document.querySelectorAll(".product-card[data-product]");
  const detailSection = document.getElementById("product-detail");
  const detailImage = document.getElementById("detail-image");
  const tempSlider = document.getElementById("temp-slider");
  const tempText = document.getElementById("temp-label");
  const backToLamps = document.getElementById("back-to-lamps");
  const productsSection = document.getElementById("products");

  /**
   * Generate room image source path
   * Format: assets/room-{productId}-{frame}.png
   */
  function getRoomImageSrc(productId, frame) {
    return `assets/room-${productId}-${frame}.png`;
  }

  /**
   * Get temperature label text based on frame
   */
  function getTempLabel(frame) {
    switch (frame) {
      case 1:
        return "Very warm";
      case 2:
        return "Warm";
      case 3:
        return "Neutral";
      case 4:
        return "Cool";
      case 5:
        return "Very cool";
      default:
        return "Neutral";
    }
  }

  /**
   * Update slider visual appearance based on temperature
   * Changes the accent color: warm → neutral → cool
   */
  function updateSliderVisual(frame) {
    if (!tempSlider) return;

    let color;
    if (frame <= 2) {
      // Warm tones
      color = "#b89968";
    } else if (frame === 3) {
      // Neutral
      color = "#d9cdb8";
    } else if (frame === 4) {
      // Cool
      color = "#8fa3b8";
    } else {
      // Very cool
      color = "#6a8fa3";
    }

    // Update CSS custom property for slider thumb color
    tempSlider.style.setProperty("--slider-color", color);

    // Update temperature label text
    if (tempText) {
      tempText.textContent = getTempLabel(frame);
    }
  }

  /**
   * Handle product card click
   * Updates current lamp and scrolls to detail section
   */
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = Number(card.dataset.product);
      if (Number.isNaN(productId)) return;

      // Update current product
      currentProductId = productId;

      // Get current temperature frame
      const frame = Number(tempSlider?.value || 2) || 2;

      // Update detail image
      if (detailImage) {
        detailImage.src = getRoomImageSrc(currentProductId, frame);
        detailImage.alt = `Lamp ${currentProductId} in a room with ${getTempLabel(
          frame
        ).toLowerCase()} light`;
      }

      // Update slider appearance
      updateSliderVisual(frame);

      // Smooth scroll to detail section
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /**
   * Handle slider input
   * Updates room image and visual feedback
   */
  if (tempSlider) {
    tempSlider.addEventListener("input", () => {
      const frame = Number(tempSlider.value);

      // Update room image
      if (detailImage) {
        detailImage.src = getRoomImageSrc(currentProductId, frame);
        detailImage.alt = `Lamp ${currentProductId} in a room with ${getTempLabel(
          frame
        ).toLowerCase()} light`;
      }

      // Update slider appearance
      updateSliderVisual(frame);
    });
  }

  /**
   * Handle "Back to collection" button
   * Scrolls back to products section
   */
  if (backToLamps && productsSection) {
    backToLamps.addEventListener("click", () => {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /**
   * Initialize on page load
   * Set initial image and slider state
   */
  if (tempSlider) {
    const startFrame = Number(tempSlider.value);

    if (detailImage) {
      detailImage.src = getRoomImageSrc(currentProductId, startFrame);
      detailImage.alt = `Lamp ${currentProductId} in a room with ${getTempLabel(
        startFrame
      ).toLowerCase()} light`;
    }

    updateSliderVisual(startFrame);
  }
});