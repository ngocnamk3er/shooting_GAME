const canvas = document.querySelector('canvas');
canvas.width=innerWidth;
canvas.height=innerHeight;
const c=canvas.getContext('2d');
var points=0
var soundshot=new Audio('SHOT.mp3')
var soundstone=new Audio('VACHAM.mp3')
var ting= new Audio('TING.mp3')
var selectgun = 0
var startBTN=document.getElementById("startgamebutton")
var hlsx=0
// document.getElementById("startgamebutton").onclick=function() {displayX()}
function init(){
    x=canvas.width/2;
    y=canvas.height/2;
    player = new Player(x,y,10,'white')
    projectiles =[]
    enemys=[]
    particles=[]
    points=0
    gunNumberGifts=[]
    document.getElementById("number").innerHTML=points
    selectgun=0
}
class Player{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle=this.color;
        c.fill();
    }
}
class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x=x;
        this.y=y;
        this.color=color;
        this.radius=radius;
        this.velocity=velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle=this.color;
        c.fill();
    }
    update()
    {
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
    
}
class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x=x;
        this.y=y;
        this.color=color;
        this.radius=radius;
        this.velocity=velocity;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle=this.color;
        c.fill();
    }
    update()
    {
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}
class Particle{
    constructor(x,y,radius,color,velocity,long){
        this.x=x;
        this.y=y;
        this.color=color;
        this.radius=radius;
        this.velocity=velocity;
        this.long=long;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle=this.color;
        c.fill();
    }
    update()
    {
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
        this.long=this.long+1;
    }
}
function spawnEnemy(){
        XXX = setInterval(()=>{
        const radius= Math.random()*(30-6)+6
        let x 
        let y 
        if(Math.random()<0.5){
            x=Math.random()<0.5 ? 0-radius:canvas.width+radius
            y=Math.random()*canvas.height
        }
        else{
            y=Math.random()<0.5 ? 0-radius:canvas.height+radius
            x=Math.random()*canvas.width
        }
        const color= `hsl(${Math.random()*360},50%,50%)`
        const angle = Math.atan2((canvas.height/2-y),(canvas.width/2-x))
        const velocity={
        x: Math.cos(angle),
        y: Math.sin(angle)
        }
        enemys.push(new Enemy(x,y,radius,color,velocity))

    },1000)
}
class gunNumberGift{
    constructor(x,y,radius,color,velocity,long){
        this.x=x;
        this.y=y;
        this.color=color;
        this.radius=radius;
        this.velocity=velocity;
        this.long=long;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.strokeStyle=this.color;
        c.stroke();
    }
    update()
    {
        this.draw()
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
        this.long=this.long+1;
    }
}
function spawngunNumberGift(){
    YYY = setInterval(()=>{
    const radius= 10
    let x 
    let y 
    if(Math.random()<0.5){
        x=Math.random()<0.5 ? 0-radius:canvas.width+radius
        y=Math.random()*canvas.height
    }
    else{
        y=Math.random()<0.5 ? 0-radius:canvas.height+radius
        x=Math.random()*canvas.width
    }
    const arr=[60,360]
    const index=Math.floor(Math.random()*2)
    hlsx=arr[index]
    const color= `hsl(${hlsx},50%,50%)`
    const angle = Math.atan2((canvas.height/2-y),(canvas.width/2-x))
    const velocity={
    x: Math.cos(angle),
    y: Math.sin(angle)
    }
    gunNumberGifts.push(new gunNumberGift(x,y,radius,color,velocity))

},Math.random()*5000+10000)
}
let x=canvas.width/2;
let y=canvas.height/2;
var player = new Player(x,y,10,'white')
var projectiles =[]
var enemys=[]
var particles=[]
let animateID
let XXX
let YYY
var scores=[]
var gunNumberGifts=[]
function animate(){
    particles.forEach((particle,indexparticle)=>{
        if(particle.long>(Math.random()*80+30)){
            setTimeout(()=>{
                particles.splice(indexparticle,1)
            })
        }
        particle.update()
    })
    animateID= requestAnimationFrame(animate)
    c.fillStyle='rgba(0,0,0,0.1)'
    c.fillRect(0,0,canvas.width,canvas.height)
    projectiles.forEach((projectile,projectileIndex)=>{
        if(projectile.x+projectile.radius<0||
            projectile.x-canvas.width>projectile.radius||
            projectile.y+projectile.radius<0||
            projectile.y-canvas.height>projectile.radius){
            setTimeout(()=>{
            projectiles.splice(projectileIndex,1)
            })
        }
        projectile.update()
    })
    player.draw()
    enemys.forEach((enemy,index)=>{
        enemy.update()
        const dist=Math.hypot(player.x-enemy.x,player.y-enemy.y)
        if(dist-player.radius-enemy.radius<0){
            // bool=1;
            scores.push(points)
            document.getElementById("notification").style.display="block"
            document.getElementById("bigscore").innerHTML=points
            document.getElementById("maxscorepoints").innerHTML=scores.reduce(function(a, b) {return Math.max(a, b);});
            enemys=[]
            clearInterval(XXX)
            clearInterval(YYY)
            cancelAnimationFrame(animateID)
        }
        projectiles.forEach((projectile,projectileIndex)=>{
            const dist=Math.hypot(projectile.x-enemy.x,projectile.y-enemy.y)
            if(dist-projectile.radius-enemy.radius<0){
                soundstone.play()
                points=points+100;
                document.getElementById('number').innerHTML=points
                for(let i=0;i<(Math.random()*10+10);i++){
                particles.push(new Particle(projectile.x,projectile.y, (Math.random()*1)+1, enemy.color,{
                    x:(Math.random()-0.5)*3.5,
                    y:(Math.random()-0.5)*3.5
                },0))
                }
                if(enemy.radius-10>4){
                    gsap.to(enemy,{
                        radius: enemy.radius-10
                    })
                    setTimeout(()=>{
                        projectiles.splice(projectileIndex,1)
                    })
                }else{
                    setTimeout(()=>{
                    enemys.splice(index,1);
                    projectiles.splice(projectileIndex,1)
                    })
                }
            }
        })
    })
    gunNumberGifts.forEach((gunNumberGift,index)=>{
        gunNumberGift.update()
        const dist=Math.hypot(player.x-gunNumberGift.x,player.y-gunNumberGift.y)
        if(dist-gunNumberGift.radius-player.radius<=0){
            ting.play()
            if(gunNumberGift.color=="hsl(60,50%,50%)"){selectgun=2}
            else if(gunNumberGift.color=="hsl(360,50%,50%)"){selectgun=1}
            gunNumberGifts.splice(index,1)
            setTimeout(()=>{selectgun=0 ; }, 6000);
        }
    })
}

addEventListener("click",(event)=>{
    if (selectgun==0){
    const angle = Math.atan2((event.clientY-canvas.height/2),(event.clientX-canvas.width/2))
    const velocity={
        x: 6*Math.cos(angle),
        y: 6*Math.sin(angle)
    }
    projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'white',velocity))
    soundshot.play()
    }
    if (selectgun==1){
        const angle1 = Math.atan2((event.clientY-canvas.height/2),(event.clientX-canvas.width/2))
        const angle2 = Math.atan2((event.clientY-canvas.height/2),(event.clientX-canvas.width/2))+0.18
        const angle3 = Math.atan2((event.clientY-canvas.height/2),(event.clientX-canvas.width/2))-0.18
        const velocity1={
            x: 6*Math.cos(angle1),
            y: 6*Math.sin(angle1)
        }
        const velocity2={
            x: 6*Math.cos(angle2),
            y: 6*Math.sin(angle2)
        }
        const velocity3={
            x: 6*Math.cos(angle3),
            y: 6*Math.sin(angle3)
        }
        projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'red',velocity1))
        projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'red',velocity2))
        projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'red',velocity3))
        soundshot.play()
    }
    if (selectgun==2){
        const angle = Math.atan2((event.clientY-canvas.height/2),(event.clientX-canvas.width/2))
        const velocity={
            x: 12*Math.cos(angle),
            y: 12*Math.sin(angle)
        }
        projectiles.push(new Projectile(canvas.width/2,canvas.height/2,5,'yellow',velocity))
        soundshot.play()
    }
})
startBTN.addEventListener('click',(event)=>{
    init()
    animate()
    spawnEnemy()
    spawngunNumberGift()
    document.getElementById("notification").style.display="none"
})

// animate()
// spawnEnemy()
// function displayX(){
//     if(bool==1){
//         bool=0
//         document.getElementById("notification").style.display="none"
//     }else{
//         bool=1
//         document.getElementById("notification").style.display="block"
//     }
// }



