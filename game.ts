#! /usr/bin/env/node
import inquirer from "inquirer";
import chalk from "chalk";
import Choices from "inquirer/lib/objects/choices.js";


class Alien {
  health: number;

  constructor() {
    this.health = 100;
  }
  Sword() {
    this.health -= Math.floor(Math.random() * 10);
    
    console.log(chalk.yellow("Aliens Health : ", this.health));
  }
  laserGun() {
    this.health -= Math.floor(Math.random() * 30);
   
    console.log(chalk.yellow("Aliens Health : ", this.health));
  }
  Missile() {
    this.health -= Math.floor(Math.random() * 70);
   
    console.log(chalk.yellow("Aliens Health : ", this.health));
  }
}

class Ship {
  name: string;
  health: number;
  fuel :number
  constructor(name: string) {
    this.name = name;
    this.health = 100;
    this.fuel= 100;

  }
  landing(planet :string){
    if (this.health >= 15 && this.fuel >= 25){ 
      //    console.log("You are succesfully Landed on ",planet);
    this.health-=15
    this.fuel-=25

}else{
    console.log("You cant have enough Fuel or Health in your SpaceShip to travel");
    
}
    
  }
  status (){
    console.log("Name : " , this.name);
    console.log("Fuel : ",this.fuel);
    console.log("Health : ", this.health);
  }
  repair(ans:number)
  {
  if(ans < 2 ){
    console.log("You need 2 resources to repairr your Ship");}
    else{
        resourceBag-=2
        console.log(chalk.cyan.bold(`${this.name} is repaired succesfully\n
        Fuel   : ${this.fuel = 100}
        Health : ${this.health = 100} `));
        

    }
    
  }
  }


  class Player{
    name :string;
    health:number;
    Ship : Ship;
    resources : number;
    constructor(name:string,shipname :string ){
        this.name =name
        this.health = 100;
        this.Ship =new Ship (shipname);
        this.resources = resourceBag;
    }
    status(){
        console.log( chalk.magenta("Name      : ", this.name));
        console.log( chalk.magenta("Health    : ", this.health));
        console.log( chalk.magenta("Resourses : ", this.resources));
        console.log( chalk.magenta("Ship      : ", this.Ship));
        
    }

  }


console.log(chalk.blue("\n\t\t-------------------------------"));
console.log(chalk.blueBright("\n\t\tWelcome To Space Adventure Game"));
console.log(chalk.blue("\n\t\t-------------------------------"));
let name = await inquirer.prompt({
  name: "Name",
  type: "input",
  message: `Enter your name :`,
  default: "Player",
});

let play = true;
let resourceBag = 0;

while (play) {
  console.log(chalk.greenBright(`Hey ${name.Name}! Your current location is Earth`));
  let selectLocation = await inquirer.prompt([
    {
      name: "Location",
      type: "list",
      message:chalk.cyanBright (` Select where you want to go :\n`),
      choices:
         [
        "Moon",
        "Mars",
        "Venus",
        "Jupitor",
      
      ],
    
    },
    {
      name: "Ship",
      type: "list",
      message:chalk.cyanBright( `Select Space Ship for your Journey: \n`),
      choices: ["CosmoJet", "Falcon Jet", "Sulaco Ship", "Nostromo Ship"],
    },
  ]);

  let clone = new Player(name.Name , selectLocation.Ship);
  clone.Ship.landing(selectLocation.Location)

  console.log(chalk.greenBright("________You have Succesfully landed on " ,selectLocation.Location, `________\n`));

    let a1 = true 
  while (a1) {

    let options = await inquirer.prompt({
      name: "Todo",
      type: "list",
      message: chalk.cyanBright(`What would you like to do \n`),
      choices: [
        "Explore",
        "My Status",
        "Ship status",
        "Repair Ship"        ,
        "Back to Earth",
        "Quit Game",
      ],
    });
    let fight = true;
    let attack = new Alien();
    let fightt = true;
    if (options.Todo === "Explore" && fightt) {
        let alienFight = (Math.random()<= 0.4 ) ? true : false ;
      if (alienFight  ) {
        console.warn(chalk.red("Aliens Caughed you stealing on ",selectLocation.Location ));
        let action = await inquirer.prompt({
          name: "action1",
          type: "list",
          message: chalk.magenta("Now ! Now what you want to do :"),
          choices: [
            "Run back to Earth",
            "Fight with Aliens",
          ],
        });
        
        if (action.action1 === "Run back to Earth"){
          a1 = false
          console.log(chalk.greenBright(`_____You have Succesfully landed on Earth_____ \n`));
        
       }
        while (action.action1 === "Fight with Aliens" && fight) {
          let weapon = await inquirer.prompt({
            name: "Select",
            type: "list",
            message: chalk.cyan(`Select a weapon for the Fight :\n`),
            choices: ["Sword", "Laser Gun", "AI Missiles"],
          });
          if (weapon.Select === "Sword") {
            console.log(attack.Sword());
            console.log(chalk.red(name.Name, "your health is reduced by Alien Attack"));
            console.log(chalk.red(name.Name, " Health :",clone.health -=Math.floor( Math.random() * 5) ));
          } else if (weapon.Select === "Laser Gun") {
            
            console.log(attack.laserGun());
            console.log(chalk.red(name.Name, "your health is reduced by Alien Attack"));
            console.log(chalk.red(name.Name, " Helth :",clone.health -=Math.floor( Math.random() * 20) ));
          } else if (weapon.Select === "AI Missiles") {
            console.log(attack.Missile());
            console.log(chalk.red(name.Name, "your health is reduced by Alien Attack"));
            console.log(chalk.red(name.Name, " Helth :",clone.health -=Math.floor( Math.random() * 40) ));
          }
          if (attack.health <= 0) {
            fight = false;
            fightt = false;
            console.log(chalk.blue(name.Name, ", you are succesfully defeated a Alien"));
          }else if (clone.health <= 0){
              a1 = false;
              fight = false;
              fightt = false;

            console.log(chalk.blue("You lost the Game "));
          }
        }
      } else {
        console.log(
          chalk.redBright(`Congratulation ! you Found a special ${selectLocation.Location} stone`)
        );
        resourceBag++;
        console.log(chalk.red(`Your Resources are : ${resourceBag}`));
      }
    } else if (options.Todo === "Ship status") {
        clone.Ship.status()

    } else if (options.Todo === "My Status"){
        clone.status()
    }else if(options.Todo === "Repair Ship"){
        clone.Ship.repair( resourceBag)
    }else if (options.Todo === "Back to Earth"){
        if (clone.Ship.health >= 15 && clone.Ship.fuel >= 25)
            { console.log(chalk.greenBright("_____You are succesfully Landed to  Earth_____"));
        clone.Ship.health-=15
        clone.Ship.fuel-=25
        a1 = false 
    
    }else{
        console.log("You cant have enough Fuel or Health in your SpaceShip to travel");
        
    }
        
    }else if (options.Todo === "Quit Game") {
      console.log(chalk.blue(`\n\t\t------------------------------------\t`));
      console.log(chalk.blueBright(`\n\t\t🎮♥-- Thank You for Playing --♥🎮\t`));
      console.log(chalk.blue(`\n\t\t------------------------------------\t`));
      play = false;
      break;
    }
  }

}
