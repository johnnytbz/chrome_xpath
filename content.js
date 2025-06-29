// Store previous highlights to remove them
let previousHighlights = [];

// Function to evaluate XPath expression
function evaluateXPath(xpath) {
  try {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    const nodes = [];
    let node;
    switch (result.resultType) {
      case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
      case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
        for (let i = 0; i < result.snapshotLength; i++) {
          node = result.snapshotItem(i);
          nodes.push(node);
        }
        break;
      case XPathResult.ANY_UNORDERED_NODE_TYPE:
      case XPathResult.FIRST_ORDERED_NODE_TYPE:
        node = result.singleNodeValue;
        if (node) nodes.push(node);
        break;
      default:
        node = result.iterateNext();
        while (node) {
          nodes.push(node);
          node = result.iterateNext();
        }
    }

    return nodes;
  } catch (error) {
    throw new Error(`Invalid XPath expression: ${error.message}`);
  }
}

// Function to highlight an element
function highlightElement(element) {
  const highlight = document.createElement('div');
  const rect = element.getBoundingClientRect();
  
  highlight.style.position = 'absolute';
  highlight.style.top = `${rect.top + window.scrollY}px`;
  highlight.style.left = `${rect.left + window.scrollX}px`;
  highlight.style.width = `${rect.width}px`;
  highlight.style.height = `${rect.height}px`;
  highlight.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
  highlight.style.border = '2px solid #ffd700';
  highlight.style.zIndex = '10000';
  highlight.style.pointerEvents = 'none';
  
  document.body.appendChild(highlight);
  return highlight;
}

// Remove previous highlights
function removeHighlights() {
  previousHighlights.forEach(highlight => highlight.remove());
  previousHighlights = [];
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'evaluateXPath') {
    try {
      removeHighlights();
      const nodes = evaluateXPath(request.xpath);
      
      const results = nodes.map(node => {
        let text = node.textContent || '';
        if (text.length > 100) {
          text = text.substring(0, 100) + '...';
        }
        
        // Highlight the element if it's an element node
        if (node.nodeType === Node.ELEMENT_NODE) {
          const highlight = highlightElement(node);
          previousHighlights.push(highlight);
        }
        
        return {
          text: text.trim(),
          tag: node.nodeType === Node.ELEMENT_NODE ? node.tagName.toLowerCase() : node.nodeType
        };
      });

      sendResponse({ results });
    } catch (error) {
      sendResponse({ error: error.message });
    }
    return true;
  }
}); 