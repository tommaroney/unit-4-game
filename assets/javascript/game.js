$(document).ready(function(event) {

    function newCharCard(jqCard, hitPoints, baseAttack, counterAttack) {

        jqCard.on("click", gameSetup);

        return {
            card: jqCard,
            hp: hitPoints,
            attackPower: baseAttack,
            counterPower: counterAttack,
            id: jqCard[0].id,
            counter: function(asDefender) {
                this.hp -= asDefender.counterPower;
            },
            hit: function(defender) {
                defender.struck(this.attackPower);
                this.attackPower += baseAttack;
                this.counter(defender);
            },
            struck: function(damage) {
                this.hp -= damage;
            },
        };
    }

    let soloCard = newCharCard($("#solo-card"), 250, 6, 25);
    soloCard.card[0].firstElementChild.innerText = "HP = " + soloCard.hp;
    let chewieCard = newCharCard($("#chewie-card"), 200, 8, 20);
    chewieCard.card[0].firstElementChild.innerText = "HP = " + chewieCard.hp;
    let lukeCard = newCharCard($("#luke-card"), 150, 10, 25);
    lukeCard.card[0].firstElementChild.innerText = "HP = " + lukeCard.hp;
    let binksCard = newCharCard($("#binks-card"), 400, 5, 10);
    binksCard.card[0].firstElementChild.innerText = "HP = " + binksCard.hp;
    let cards = [ chewieCard, lukeCard, binksCard, soloCard ];

    let characterSlot = $("#characterSlot");
    let enemiesSlot = $("#enemiesSlot");
    let enemiesContainer = $("#enemies-container")
    let defenderSlot = $("#defenderSlot");
    let attackButton = $('#attack');
    let characterSelected = false;
    let defenderSelected = false;
    let character, defender;
    
    // let fighterArray = [ soloCard, chewieCard, lukeCard, binksCard ];
    
    
    
    function gameSetup(event) {
        
        if(!characterSelected) {
            
            for(let i = 0; i < cards.length; i++) {
                if(this.id === cards[i].id) {
                    character = cards[i];
                }
                else
                enemiesSlot.append(cards[i].card);
                console.log(enemiesSlot);
                console.log(enemiesSlot[0].children.length);
            }
            characterSelected = true;
            character.card.off("click");
            
            characterSlot.append(character.card);
            
        }
        
        else if(!defenderSelected) {
            for(let i = 0; i < cards.length; i++) {
                if(this.id === cards[i].id){
                    defender = cards[i];
                    defenderSelected = true;
                    attackButton.on("click", (event) => {
                        strike(defender);
                        isWin();
                    });
                }
            }
            defender.card.off("click");
            
            defenderSlot.append(defender.card);
            enemiesContainer.hide();
            
        }
    }

    function strike(opponent) {
        character.hit(opponent);
        $(character.card[0].firstElementChild).text(character.hp);
        $(defender.card[0].firstElementChild).text(defender.hp);
    }
    
    function isWin() {
        if(character.hp <= 0)
            $("#mainC").empty().append($("<div class='jumbotron'><h1>Game Over!</h1></div>"));
        if(defender.hp <= 0) {
            defender.card.remove();
            enemiesContainer.show();
            defenderSelected = false;
            console.log(enemiesSlot[0].children.length);
            attackButton.off('click');    
        }
        if(enemiesSlot[0].children.length === 0 && defenderSlot[0].children.length === 0) {
            console.log("win");
            $("#mainC").empty().append($("<div class='jumbotron'></div>").append($("<h1>You Win!</h1>")));
        }
    }
});