import './make-menu.css';

export function makeMenu(
  {
    toggle,
    toggleTarget,
    toggleActiveClass,
    windowWidth,
  } = {},
) {
  if (!toggle) throw new Error('`toggle` property must be valid HTMLElement or string');
  if (!toggleTarget) throw new Error('`toggleTarget` property must be valid HTMLElement or string');

  const thisToggle = toggle instanceof HTMLElement ? toggle : typeof toggle === 'string' ? document.querySelector(`${toggle}`) : null;
  const thisToggleTarget = toggleTarget instanceof HTMLElement ? toggleTarget : typeof toggleTarget === 'string' ? document.querySelector(`${toggleTarget}`) : null;

  if (!thisToggle) throw new Error('`toggle` property must be valid HTMLElement or string');
  if (!thisToggleTarget) throw new Error('`toggleTarget` property must be valid HTMLElement or string');

  thisToggleTarget.classList.add('toggle-target-hidden');

  thisToggle.addEventListener('click', function () {
    this.classList.toggle(toggleActiveClass);

    if (thisToggleTarget.style.maxHeight) {
      thisToggleTarget.removeAttribute('style');
    } else {
      thisToggleTarget.style.maxHeight = `${thisToggleTarget.scrollHeight}px`;
    }
  }, false);

  window.addEventListener('resize', () => {
    window.innerWidth >= windowWidth ? thisToggleTarget.classList.remove('toggle-target-hidden') : thisToggleTarget.classList.add('toggle-target-hidden');
  }, false);
}
