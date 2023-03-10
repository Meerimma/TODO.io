let todos = [];
let status = '';
let time = '';
let date = '';


if (localStorage.getItem('todos') !== null) {
    todos = JSON.parse(localStorage.getItem('todos'))
}

if (localStorage.getItem('status') !== null) {
    status = localStorage.getItem('status')
}


let list = document.querySelector('.list');
let form = document.querySelector('.form');
let p = document.querySelector('.p');
let Btnall = document.querySelector('.all');
let Btndone = document.querySelector('.done');
let Btnimportent = document.querySelector('.importent');
let day = document.querySelector('.day');
let hour = document.querySelector('.hour');
let month = document.querySelector('.month');
let year = document.querySelector('.year');
let weekDay = document.querySelector('.week-day');
let inputTime = document.querySelector('.time');
let timeBtn = document.querySelector('.time-btns');
let btnBefore = document.querySelector('.btn-before');
let btnAfter = document.querySelector('.btn-after');
let deleteAll = document.querySelector('.btn-deleteAll');
let submit = document.querySelector('.submit');



let now = new Date();

const toDate = (date) => {
    return new Intl.DateTimeFormat('ru-Ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long"
    }).format(new Date(date))
};


let nowDate = toDate(now).split(' ');
console.log(nowDate)
day.textContent = nowDate[1];
month.textContent = nowDate[2];
year.textContent = nowDate[3];
weekDay.textContent = nowDate[0].replace(',', '');
hour.textContent = nowDate[5].slice(0, 5);


const addList = () => {
    todos.filter((item) => {
        if (status === 'done') {
            return item.done
        } else if (status === 'importent') {
            return item.importent
        } else {
            return item
        }
    }).filter((item) => {
        if (time === 'after') {
            return new Date(item.dateFilter).getTime() > new Date(date).getTime()
        } else if (time === 'before') {
            return new Date(item.dateFilter).getTime() < new Date(date).getTime()
        } else {
            return item
        }
    }).forEach((item) => {
        let li = document.createElement('li');
        let btn = document.createElement('button');
        let date = document.createElement('span');
        let done = document.createElement('button');
        let imp = document.createElement('button');
        date.textContent = `${item.date[1]} - ${item.date[5].slice(0, 5)}`;
        imp.textContent = 'Importent';
        imp.classList.add('btn-imp');
        if (item.importent) {
            li.style.color = 'gold';
            imp.style.background = 'gold'
        }

        done.textContent = 'done';
        done.classList.add('btn-done');
        done.setAttribute('data-id', item.id);
        btn.textContent = 'Delete';
        btn.classList.add('btn-delete');
        btn.setAttribute('data-id', item.id);
        if (item.done) {
            li.style.textDecoration = 'line-through';
            done.style.background = 'green'
        }
        li.textContent = item.text;
        li.setAttribute('id', item.id);
        li.classList.add('list-item');
        li.prepend(done);
        li.prepend(date);
        li.append(imp);
        li.append(btn);
        list.append(li);
        btn.addEventListener('click', () => {
            todos = todos.filter((el) => {
                return el.id !== +btn.dataset.id
            });
            localStorage.setItem('todos', JSON.stringify(todos));
            list.innerHTML = '';
            addList()
        });

        done.addEventListener('click', () => {
            item.done = !item.done;
            localStorage.setItem('todos', JSON.stringify(todos));
            list.innerHTML = '';
            addList()
        });

        imp.addEventListener('click', () => {
            item.importent = !item.importent;
            localStorage.setItem('todos', JSON.stringify(todos));
            list.innerHTML = '';
            addList()
        })
    });
    if (todos.length) {
        p.style.display = 'none'
    } else {
        p.style.display = 'block'
    }

};
addList();

let input = document.querySelector('.input');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.startsWith(' ')){
        alert('Задача не должна начинаться с пробела!')
        e.target[0].value = '';
        return
    }
    todos = [...todos, {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        text: e.target[0].value,
        importent: false,
        done: false,
        dateFilter: new Date().toISOString(),
        date: toDate(new Date()).split(' ')
    }];
    localStorage.setItem('todos', JSON.stringify(todos));
    e.target[0].value = '';
    list.innerHTML = '';
    console.log(todos);
    addList()
});


Btnall.addEventListener('click', () => {
    status = '';
    submit.disabled = false
    Btnall.style.background = 'white'
    Btnimportent.style.background = ''
    Btndone.style.background = 'grey'
    localStorage.setItem('status', '');
    list.innerHTML = '';
    addList()
});

Btndone.addEventListener('click', () => {
    status = 'done';
    localStorage.setItem('status', 'done');
    submit.setAttribute('disabled', 'true')
    Btnall.style.background = 'grey';
    Btnimportent.style.background = 'grey'
    Btndone.style.background = 'green'
    list.innerHTML = '';
    addList()
});

Btnimportent.addEventListener('click', () => {
    status = 'importent';
    submit.disabled = true
    Btnall.style.background = 'grey'
    Btnimportent.style.background = 'gold'
    Btndone.style.background = 'grey'
    localStorage.setItem('status', 'importent');
    list.innerHTML = '';
    addList()
});
deleteAll.addEventListener('click', () => {
    todos = [];
    localStorage.removeItem('todos');
    list.innerHTML = '';
    addList();
});


inputTime.addEventListener('change', (e) => {
    timeBtn.style.display = 'block';
    date = e.target.value;
    if (time.length) {
        list.innerHTML = '';
        addList()
    }
});


btnBefore.addEventListener('click', () => {
    time = 'before';
    list.innerHTML = '';
    addList();
    btnBefore.style.background = 'green';
    btnAfter.style.background = 'transparent'

});
btnAfter.addEventListener('click', () => {
    time = 'after';
    list.innerHTML = '';
    addList();
    btnAfter.style.background = 'green';
    btnBefore.style.background = 'transparent'
});


// localStorage.setItem('person', JSON.stringify([1,2,3,4,5]))
//
// console.log(JSON.parse(localStorage.getItem('person')));


VANTA.CLOUDS({
    el: "#todo",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed: 1.30
});