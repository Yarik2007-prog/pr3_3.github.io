const $btn = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-special');
const $btn3 = document.getElementById('btn-reset');

const character = {
  name: 'Alastor',
  defaultHP: 100,
  damageHP: 100,
  elHP: null,
  elProgressbar: null,
  renderHP,
  changeHP,
  reset,
};

const enemy = {
  name: 'Lucifer',
  defaultHP: 100,
  damageHP: 100,
  elHP: null,
  elProgressbar: null,
  renderHP,
  changeHP,
  reset,
};

// --- функції ---
function renderHP() {
  const { elHP, damageHP, defaultHP, elProgressbar } = this;
  elHP.innerText = `${damageHP} / ${defaultHP}`;
  elProgressbar.style.width = `${damageHP}%`;
}

function changeHP(dmg, attackerName) {
  const { name, defaultHP } = this;
  this.damageHP -= dmg;
  if (this.damageHP <= 0) {
    this.damageHP = 0;
    this.renderHP();
    getBattleLog(attackerName, name, dmg, this.damageHP, defaultHP);
    addLogEntry(` ${name} програв бій!`);
    $btn.disabled = true;
    $btn2.disabled = true;
    alert(`Бідний ${name} програв бій :)`);
  } else {
    this.renderHP();
    getBattleLog(attackerName, name, dmg, this.damageHP, defaultHP);
  }
}

function reset() {
  this.damageHP = this.defaultHP;
  this.renderHP();
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

// --- функція замикання для підрахунку кліків ---
const initCounter = (limit, button, baseLabel) => {
  let count = 0;

  const updateLabel = () => {
    button.textContent = `${baseLabel} (залишилось: ${limit - count})`;
  };

  updateLabel();

  return () => {
    if (count < limit) {
      count++;
      updateLabel();
      if (count >= limit) {
        button.disabled = true; 
        console.log(`${baseLabel}: досягнуто максимум натискань`);
      } else {
        console.log(`${baseLabel} — натиснуто: ${count}, залишилось: ${limit - count}`);
      }
      return true;
    } else {
      alert("Ліміт натискань досягнуто!");
      return false;
    }
  };
};


let kickCounter = initCounter(5, $btn, 'Fight');
let specialCounter = initCounter(3, $btn2, 'Special');

$btn.onclick = function() {
  if (!kickCounter()) return;
  const dmgToEnemy = random(20);
  const dmgToCharacter = random(20);
  enemy.changeHP(dmgToEnemy, character.name);
  character.changeHP(dmgToCharacter, enemy.name);
};

$btn2.onclick = function() {
  if (!specialCounter()) return;
  const dmgToEnemy = random(50);
  const dmgToCharacter = random(50);
  enemy.changeHP(dmgToEnemy, character.name);
  character.changeHP(dmgToCharacter, enemy.name);
};

$btn3.onclick = function() {
  character.reset();
  enemy.reset();

  $btn.disabled = false;
  $btn2.disabled = false;
  document.getElementById('logs').innerHTML = '';
  addLogEntry('Бій скинуто!');

  kickCounter = initCounter(5, $btn, 'Fight');
  specialCounter = initCounter(3, $btn2, 'Special');

  console.log("Лічильники оновлено після ресету");
};

// --- ініціалізація ---
function init() {
  character.elHP = document.getElementById('health-character');
  character.elProgressbar = document.getElementById('progressbar-character');
  enemy.elHP = document.getElementById('health-enemy');
  enemy.elProgressbar = document.getElementById('progressbar-enemy');
  character.renderHP();
  enemy.renderHP();
  addLogEntry(' Бій розпочато!');
}
init();

