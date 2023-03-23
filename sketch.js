const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var fundo, fundoImg;
var foguete, foguete1, fogueteImg;
var meteoroImg;
var estrelaImg;
var placar = 0;
var JOGAR = 1;
var ENCERRAR = 0
var estados = JOGAR;
var gameover;
var placarEstrela = 0;
var restartbutton,restartbuttonImg;

function preload(){
fundoImg = loadImage("C19/backgroundspace-1.png");
  fogueteImg = loadImage("C19/rocketsprite.png");
  estrelaImg = loadImage("C19/starsprite.png");
  meteoroImg = loadImage("C19/meteorSprite.png");
  gameover = loadImage("C19/gameOver.png");
  restartbuttonImg = loadImage("C19/restartSprite2.png");
}

function setup() {
 createCanvas(400, 400);
 
 engine = Engine.create();
 world = engine.world;
 
 fundo = createSprite(200,200,20,20);
  fundo.addImage(fundoImg);
  fundo.scale = 1.5;
  fundo.velocityX = 4;
 
  //foguete = createSprite(300,320,10,10);
 // foguete.addImage(fogueteImg);
 // foguete.scale = 0.2;
  
    restartbutton = createSprite(200,260,20,20);
    restartbutton.addImage(restartbuttonImg);
    restartbutton.scale = 0.4
  
    GrupoEstrela = new Group();
    GrupoMeteoro = new Group();
  
    foguete1 = new Foguete(300,320,100,100);

  
}

function draw() {
  background(220);
 
 
  if(fundo.x>400){
   
   fundo.x = width/5;
 }
  fill("yellow");
  placar = placar + Math.round((frameRate()/60));
  
  estrelaPontos = Math.round(random(1,3));
  if(foguete1.collide(GrupoEstrela)){
    
  switch(estrelaPontos){
    case 1: placarEstrela = placarEstrela + 1;
       GrupoEstrela[0].remove();
      break;
    case 2: placarEstrela = placarEstrela + 2;
      GrupoEstrela[0].remove();
      break;
    case 3: placarEstrela = placarEstrela + 3 ;
      GrupoEstrela[0].remove();
      break;
  }
    foguete1.display();
  }
  if(GrupoMeteoro.isTouching(foguete1)){
    
    estados=ENCERRAR;
  }
  if(estados== ENCERRAR){
    GrupoMeteoro.setVelocityYEach(0);
    GrupoEstrela.setVelocityYEach(0);
    foguete1.addImage(gameover);
    foguete1.changeImage(gameover)
    foguete1.scale = 0.4;
    foguete1.x = 200;
    foguete1.y = 200;
    GrupoEstrela.destroyEach();
    GrupoMeteoro.destroyEach();
    foguete1.setVelocityXEach = (0);
    foguete1.setVelocityYEach = (0);
    fundo.velocityX = 0;
    placarEstrela = 0;
    placar = 0;
    restartbutton.visible = true;
    
    if(mousePressedOver(restartbutton)){
      redefinir();
      
    }
    
  }
  if(estados==JOGAR){
 restartbutton.visible = false;
  
   if(keyDown("W")){
    
    foguete1.y = foguete1.y - 4.75;
  }
  if(keyDown("S")){
    
    foguete1.y = foguete1.y + 4.75;
  }
    GerarEstrelas();
    GerarMeteoros();
   
    
    
  }
                     
  drawSprites();
 fill("yellow");
  textSize(14);
  text("Pontuação:"+ placar,20,20);
  text("Estrelas:"+placarEstrela,21,40);
  if(estados==ENCERRAR){
    
    
  }

}
function GerarEstrelas(){
  if(frameCount % 60== 0){
    var estrela = createSprite(50,40,15,15);
   estrela.addImage(estrelaImg);
    estrela.y = Math.round(random(50,350));
    estrela.velocityX = 3.4;
    estrela.scale = 0.05;
    estrela.lifetime = 134;
    
    GrupoEstrela.add(estrela);}
}

 function GerarMeteoros(){
   if(frameCount % 100 == 0){
var meteoro = createSprite(30,40,20,20);
meteoro.addImage(meteoroImg);
meteoro.velocityX = 4;
meteoro.y = Math.round(random(30,250));
meteoro.scale = 0.12;
meteoro.lifetime = 80;

GrupoMeteoro.add(meteoro);}
 }
function redefinir(){
  
   estados=JOGAR;
      foguete1.addImage(fogueteImg);
      foguete1.changeImage(fogueteImg);
      foguete1.scale =0.2;
      foguete1.x = 200;
      foguete1.y = 350;
      fundo.velocityX = 4;}
