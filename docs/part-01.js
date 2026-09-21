const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-panel]');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTab = button.dataset.tab;
    tabButtons.forEach((item) => item.classList.toggle('active', item === button));
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === selectedTab));
  });
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const originalText = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = originalText; }, 1400);
  });
});

document.querySelector('.copy-all')?.addEventListener('click', async (event) => {
  const command = event.currentTarget.closest('.command-block').querySelector('code').textContent;
  await navigator.clipboard.writeText(command);
  const originalText = event.currentTarget.textContent;
  event.currentTarget.textContent = 'Copied';
  setTimeout(() => { event.currentTarget.textContent = originalText; }, 1400);
});

document.querySelectorAll('.checklist input').forEach((checkbox) => {
  checkbox.addEventListener('change', () => checkbox.closest('label').classList.toggle('checked', checkbox.checked));
});
