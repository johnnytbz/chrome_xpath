document.addEventListener('DOMContentLoaded', function() {
  const xpathInput = document.getElementById('xpath');
  const evaluateButton = document.getElementById('evaluate');
  const resultsDiv = document.getElementById('results');
  const matchCountDiv = document.getElementById('matchCount');

  evaluateButton.addEventListener('click', async function() {
    const xpath = xpathInput.value.trim();
    if (!xpath) {
      resultsDiv.innerHTML = '<p style="color: red;">Please enter an XPath expression</p>';
      return;
    }

    try {
      // Send message to content script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'evaluateXPath',
        xpath: xpath
      });

      // Display results
      if (response.error) {
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${response.error}</p>`;
        matchCountDiv.textContent = '';
      } else {
        matchCountDiv.textContent = `Found ${response.results.length} matches`;
        resultsDiv.innerHTML = response.results.map((result, index) => `
          <div style="margin-bottom: 8px; padding: 5px; background-color: ${index % 2 === 0 ? '#f5f5f5' : 'white'}">
            <strong>Match ${index + 1}:</strong><br>
            ${result.text}<br>
            <small style="color: #666;">Tag: ${result.tag}</small>
          </div>
        `).join('');
      }
    } catch (error) {
      resultsDiv.innerHTML = `<p style="color: red;">Error: Could not communicate with the page. Please refresh and try again.</p>`;
      matchCountDiv.textContent = '';
    }
  });
}); 