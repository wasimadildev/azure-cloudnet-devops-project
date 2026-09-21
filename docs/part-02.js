document.querySelectorAll('[data-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTab = button.dataset.tab;
    const group = button.closest('.section-body');
    group.querySelectorAll('[data-tab]').forEach((item) => item.classList.toggle('active', item === button));
    group.querySelectorAll('[data-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === selectedTab));
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

document.querySelectorAll('.checklist input').forEach((checkbox) => {
  checkbox.addEventListener('change', () => checkbox.closest('label').classList.toggle('checked', checkbox.checked));
});
