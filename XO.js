let buttons = document.getElementsByClassName("btn");
let label1 =document.getElementById("label1");
let newGame = document.getElementById("newGame");
let inputs = document.getElementsByName("check");
let one = document.getElementById("one");
let two = document.getElementById("two");
let crossMove =true;
let area =[];
let count=0;
let win = false;




// Игра против человека
newGame.onclick= function() // Старт новой игры
{
    crossMove =true;
    area =[];
    count=0;
    label1.innerHTML="";
    for (let i=0; i<buttons.length;i++)
    buttons[i].innerHTML="&nbsp";
    win = false;
}

function GameWithPerson()
{
for (let i=0; i<buttons.length;i++)
{
    buttons[i].onclick = function()
    {
        if(!win)
        {
            if (area[i]!='X' &&area[i]!='O')
            {
                count++;
                if (crossMove)
                {
                    buttons[i].style.color="red";
                    area[i]='X';
                }
                else
                {
                    buttons[i].style.color="blue";
                    area[i]='O';
                }
            
                buttons[i].innerHTML=area[i];
      
                if (checkWinner())
                {
                    if (crossMove)
                    {
                        label1.innerHTML="Выиграли крестики";
                        label1.style.color= "red";
                        win = true;  
                    }
                    else
                    {
                        label1.innerHTML="Выиграли нолики";
                        label1.style.color= "blue";
                        win = true;  
                    }
                }   
                else if (count>=9)
                {
                    label1.innerHTML="Ничья";
                    label1.style.color= "green";
                    win = true;  
                }       
            crossMove=!crossMove;
            }
        }
    }
}
}

function checkWinner() // Проверка на победу
{
    if (area[0]==area[1]&&area[1]==area[2] && area[0]!=undefined) return true;
    if (area[3]==area[4]&&area[4]==area[5] && area[3]!=undefined) return true;
    if (area[6]==area[7]&&area[7]==area[8] && area[6]!=undefined) return true;

    if (area[0]==area[3]&&area[3]==area[6] && area[0]!=undefined) return true;
    if (area[1]==area[4]&&area[4]==area[7] && area[1]!=undefined) return true;
    if (area[2]==area[5]&&area[5]==area[8] && area[2]!=undefined) return true;

    if (area[0]==area[4]&&area[4]==area[8] && area[0]!=undefined) return true;
    if (area[2]==area[4]&&area[4]==area[6] && area[2]!=undefined) return true;

    return false;
}

for(var i = 0; i < inputs.length; i++) inputs[i].onchange = checkboxHandler;

// Игра с компьютером
function GameWithComputer()
{
for (let i=0; i<buttons.length;i++)
{   

    buttons[i].onclick = function()
    {
        if(!win) // игра до победы или ничьи
        {
            if (area[i]!='X' && area[i]!='O')
            {
                count += 2;
                buttons[i].style.color="red"; // ход человека
                area[i]='X';
                buttons[i].innerHTML=area[i];

                if (checkWinner()) // Проверка на победу человека
                {                
                    label1.innerHTML="Выиграли крестики";
                    label1.style.color= "red";  
                    win = true;          
                }  
                else if (count>=9) // Проверка на ничью
                {
                    label1.innerHTML="Ничья";
                    label1.style.color= "green";
                    win = true;
                } 
                else 
                {
                    crossMove=!crossMove;
                    if(!crossMove) CanWinOrLose('O'); // Если компьютер может победить, то побеждает
                    if(!crossMove) CanWinOrLose('X'); // Если компьютер может проиграть, он предотвращает поражение
                    if(!crossMove)
                    {
                        if (area[4]!='X' && area[4]!='O') // Компьютер ходит в центр
                        {
                            ComputerStep(4);
                        }
                    }
                    if(!crossMove) GoToCorner(); // Компьютер ходит в угол
                    if(!crossMove) GoSideways(); //Компьютер ходит в сторону

                    if (checkWinner()) // Проверка на победу компьютера
                    {                    
                        label1.innerHTML="Выиграли нолики";
                        label1.style.color= "blue"; 
                        win = true;                 
                    }   
                    else if (count>=9) // Проверка на ничью
                    {
                        label1.innerHTML="Ничья";
                        label1.style.color= "green";
                        win = true;
                    } 
                }                     
            } 
        }   
    }
}
}

function ComputerStep(i)
{
    buttons[i].style.color="blue"; 
    area[i]='O';
    buttons[i].innerHTML=area[4];
    crossMove=!crossMove;
}

function CanWinOrLose(N) // проверка на возможность выйгрыша или пройгрыша
{  
        // Проверяются горизонтали

        if (area[0]== N && area[1]== N && area[2]!='X' &&area[2]!='O') ComputerStep(2);
        else if (area[1]== N && area[2]== N && area[0]!='X' &&area[0]!='O') ComputerStep(0);
        else if (area[0]== N && area[2]==N && area[1]!='X' &&area[1]!='O') ComputerStep(1);

        else if (area[3]== N && area[4]== N && area[5]!='X' &&area[5]!='O') ComputerStep(5);
        else if (area[4]== N && area[5]== N && area[3]!='X' &&area[3]!='O') ComputerStep(3);
        else if (area[3]== N && area[5]== N && area[4]!='X' &&area[4]!='O') ComputerStep(4);

        else if (area[6]== N && area[7]== N && area[8]!='X' &&area[8]!='O') ComputerStep(8);
        else if (area[7]== N && area[8]== N && area[6]!='X' &&area[6]!='O') ComputerStep(6);
        else if (area[6]== N && area[8]== N && area[7]!='X' &&area[7]!='O') ComputerStep(7);
    
        // Проверяются вертикали

        else if (area[3]== N && area[6]== N && area[0]!='X' &&area[0]!='O') ComputerStep(0);
        else if (area[0]== N && area[6]== N && area[3]!='X' &&area[3]!='O') ComputerStep(3);
        else if (area[0]== N && area[3]== N && area[6]!='X' &&area[6]!='O') ComputerStep(6);

        else if (area[4]== N && area[7]== N && area[1]!='X' &&area[1]!='O') ComputerStep(1);
        else if (area[1]== N && area[7]== N && area[4]!='X' &&area[4]!='O') ComputerStep(4);
        else if (area[1]== N && area[4]== N && area[7]!='X' &&area[7]!='O') ComputerStep(7);

        else if (area[5]== N && area[8]== N && area[2]!='X' &&area[2]!='O') ComputerStep(2);
        else if (area[2]== N && area[8]== N && area[5]!='X' &&area[5]!='O') ComputerStep(5);
        else if (area[2]== N && area[5]== N && area[8]!='X' &&area[8]!='O') ComputerStep(8);

        // Проверяется первая диагональ

        else if (area[4]== N && area[8]== N && area[0]!='X' &&area[0]!='O') ComputerStep(0);
        else if (area[0]== N && area[8]== N && area[4]!='X' &&area[4]!='O') ComputerStep(4);
        else if (area[0]== N && area[4]== N && area[8]!='X' &&area[8]!='O') ComputerStep(8);

        // Проверяется вторая диагональ
        else if (area[4]== N && area[6]== N && area[2]!='X' &&area[2]!='O') ComputerStep(2);
        else if (area[2]== N && area[6]== N && area[4]!='X' &&area[4]!='O') ComputerStep(4);
        else if (area[2]== N && area[4]== N && area[6]!='X' &&area[6]!='O') ComputerStep(6);
}

function GoToCorner() // ход в угол
{
    if(area[0]!='X' &&area[0]!='O') ComputerStep(0);
    else if(area[2]!='X' &&area[2]!='O') ComputerStep(2);
    else if(area[6]!='X' &&area[6]!='O') ComputerStep(6);
    else if(area[8]!='X' &&area[8]!='O') ComputerStep(8);
}

function GoSideways() //ход в сторону
{
    for (let i = 0; i < 9;i++)
    {
        if(area[i]!='X' && area[i]!='O') 
        {
            ComputerStep(i);
            return;
        }
    }
}

function checkboxHandler(e) // Установка режима игры
{
        for(var i = 0; i < inputs.length; i++)
        if(inputs[i].checked && inputs[i] !== this) inputs[i].checked = false;
        if(one.checked) 
        {
            GameWithPerson();
        }
        else if(two.checked)
        {
            GameWithComputer();
        }
        
}





