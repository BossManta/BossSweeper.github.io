var nodeSize = 30;
var canvSize = 600;
var numberOfMines = 50;

var Nodes=[];
var MineDraw=[];
var PlacedMines=false;
var mouseClickBool=false;
var GameOver = false;
var Win = false;
var cnv;

var foundMouseNode;

function setup() {
  cnv = createCanvas(canvSize,canvSize);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  
  for (var i=0; i<canvSize/nodeSize; i++)
  {
    for (var p=0; p<canvSize/nodeSize; p++)
    {
      Nodes.push(new Node(i, p));
    }
  }
}

 function windowResized()
{
	cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function ChooseMines()
{
  for (var i=0; i<(canvSize/nodeSize)*(canvSize/nodeSize); i++)
  {
    if (i!=foundMouseNode && i!=foundMouseNode+1 && i!=foundMouseNode-1 && i!=foundMouseNode-canvSize/nodeSize && i!=foundMouseNode+canvSize/nodeSize)
    {
      if (i!=foundMouseNode+canvSize/nodeSize+1 && i!=foundMouseNode-canvSize/nodeSize+1 && i!=foundMouseNode+canvSize/nodeSize-1 && i!=foundMouseNode-canvSize/nodeSize-1)
      MineDraw.push(i);
    }
  }
  
  for (var i=0; i<numberOfMines; i++)
  {
    var MineChosen=floor(random(0,MineDraw.length));
    Nodes[MineDraw[MineChosen]].isMine=true;
    Nodes[MineDraw[MineChosen]].number=-1;
    MineDraw.splice(MineChosen,1);
  }
}

function Node(x, y)
{
  this.x=x;
  this.y=y;
  this.open=false;
  this.isMine=false;
  this.number=0;
  
  this.show = function()
  {
    if (this.open)
    {
      if (this.isMine)
      {
        fill(50,50,50);
      }
      else
      {
        fill(200,225,255);
      }
    }
    rect(this.x*nodeSize,this.y*nodeSize,nodeSize,nodeSize);
    if (this.open)
    {
      if (this.number!=0)
      {
        fill(255,255,255);
        stroke(50,100,255);
        textAlign(CENTER,TOP);
        textFont("Fantasy");
        textSize((nodeSize/5)*4);
        text(this.number,(this.x*nodeSize)+nodeSize/2,(this.y*nodeSize));
      }
    }
    else
    {
      if (this.number==-2)
      {
        fill(255,255,255);
        stroke(50,100,255);
        textAlign(CENTER,TOP);
        textFont("Fantasy");
        textSize((nodeSize/5)*4);
        text("P",(this.x*nodeSize)+nodeSize/2,(this.y*nodeSize));
      }
    }
  }
}

function FindNode(x, y)
{
  for (var i=0; i<Nodes.length; i++)
  {
    if (Nodes[i].x==x && Nodes[i].y==y)
    {
      return i;
      break;
    }
  }
  return -1
}

function FindMouseNode()
{
    return FindNode(floor(mouseX/nodeSize),floor(mouseY/nodeSize));
}

function mouseClickCheck()
{
  if (foundMouseNode!=-1)
  {
    if(mouseIsPressed)
    {
      if (!mouseClickBool)
      {
        if (mouseButton==LEFT)
        {
          if (!PlacedMines)
          {
            ChooseMines();
            PlacedMines=true;
          }
          if (Nodes[foundMouseNode].number!=-2)
          {
            floodFill(foundMouseNode);
          }
        }
        else
        {
          if (!Nodes[foundMouseNode].open)
          {
            if (Nodes[foundMouseNode].number!=-2)
            {
              Nodes[foundMouseNode].number=-2;
            }
            else
            {
              Nodes[foundMouseNode].number=0;
            }
          }
        }
      }
      mouseClickBool=true;
    }
    else
    {
      mouseClickBool=false;
    }
  }
}

function floodFill(nodeNum)
{
  var nodeNumbersToFill=[];
  if (nodeNum!=-1)
  {
    if (!Nodes[nodeNum].isMine)
    {
      if (!Nodes[nodeNum].open)
      {
        Nodes[nodeNum].open=true;
        
        //Check Left
        if (Nodes[nodeNum].x>0)
        {
          if (!Nodes[nodeNum-canvSize/nodeSize].isMine)
          {
            if (!Nodes[nodeNum-canvSize/nodeSize].open)
            {
              nodeNumbersToFill.push(nodeNum-canvSize/nodeSize);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Right
        if (Nodes[nodeNum].x<canvSize/nodeSize-1)
        {
          if (!Nodes[nodeNum+canvSize/nodeSize].isMine)
          {
            if (!Nodes[nodeNum+canvSize/nodeSize].open)
            {
              nodeNumbersToFill.push(nodeNum+canvSize/nodeSize);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Up
        if (Nodes[nodeNum].y>0)
        {
          if (!Nodes[nodeNum-1].isMine)
          {
            if (!Nodes[nodeNum-1].open)
            {
              nodeNumbersToFill.push(nodeNum-1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Down
        if (Nodes[nodeNum].y<canvSize/nodeSize-1)
        {
          if (!Nodes[nodeNum+1].isMine)
          {
            if (!Nodes[nodeNum+1].open)
            {
              nodeNumbersToFill.push(nodeNum+1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Left Up
        if (Nodes[nodeNum].x>0 && Nodes[nodeNum].y>0)
        {
          if (!Nodes[nodeNum-canvSize/nodeSize-1].isMine)
          {
            if (!Nodes[nodeNum-canvSize/nodeSize-1].open)
            {
              nodeNumbersToFill.push(nodeNum-canvSize/nodeSize-1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Left Down
        if (Nodes[nodeNum].x>0 && Nodes[nodeNum].y<canvSize/nodeSize-1)
        {
          if (!Nodes[nodeNum-canvSize/nodeSize+1].isMine)
          {
            if (!Nodes[nodeNum-canvSize/nodeSize+1].open)
            {
              nodeNumbersToFill.push(nodeNum-canvSize/nodeSize+1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Right Up
        if (Nodes[nodeNum].x<canvSize/nodeSize-1 && Nodes[nodeNum].y>0)
        {
          if (!Nodes[nodeNum+canvSize/nodeSize-1].isMine)
          {
            if (!Nodes[nodeNum+canvSize/nodeSize-1].open)
            {
              nodeNumbersToFill.push(nodeNum+canvSize/nodeSize-1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        //Check Right Down
        if (Nodes[nodeNum].x<canvSize/nodeSize-1 && Nodes[nodeNum].y<canvSize/nodeSize-1)
        {
          if (!Nodes[nodeNum+canvSize/nodeSize+1].isMine)
          {
            if (!Nodes[nodeNum+canvSize/nodeSize+1].open)
            {
              nodeNumbersToFill.push(nodeNum+canvSize/nodeSize+1);
            }
          }
          else
          {
            Nodes[nodeNum].number++;
          }
        }
        
        if (Nodes[nodeNum].number==0)
        {
          for (var i=0; i<nodeNumbersToFill.length; i++)
          {
            floodFill(nodeNumbersToFill[i]);
          }
        }
      }
    }
    else
    {
      GameOver=true;
    }
  }
}

function WinCheck()
{
  this.Check=true;
  for (var i=0; i<Nodes.length; i++)
  {
    if (!Nodes[i].isMine)
    {
      if (!Nodes[i].open)
      {
        this.Check=false;
      }
    }
  }
  if (this.Check)
  {
    Win=true;
    mouseClickBool=true;
  }
}

function draw() {
  
  if (!GameOver && !Win)
  {
    foundMouseNode=FindMouseNode();
    mouseClickCheck();
    WinCheck();
    
    background(255,255,255);
    
    for (var i=0; i<Nodes.length; i++)
    {
      if (foundMouseNode==i)
      {
        stroke(50,100,150);
      }
      else
      {
        noStroke();
      }
      
      fill(150,200,255);
      Nodes[i].show();
    }
  }
  else if(GameOver)
  {
    background(150,50,50,1);
    textSize(canvSize/5);
    fill(10,10,10);
    text("Game Over!", canvSize/2,canvSize/3);
    textSize(canvSize/10);
    text("Click to restart",canvSize/2,(canvSize/5)*3);
    if (mouseIsPressed)
    {
      if (!mouseClickBool)
      {
        Nodes=[];
        MineDraw=[];
        PlacedMines=false;
        GameOver = false;
        Win = false;
        
        print(Nodes.length)
        foundMouseNode;
        
        for (var l=0; l<canvSize/nodeSize; l++)
        {
          for (var p=0; p<canvSize/nodeSize; p++)
          {
            Nodes.push(new Node(l, p));
            mouseClickBool=true;
          }
        }
      }
    }
    else
    {
      mouseClickBool=false;
    }
  }
  else
  {
    background(100,100,255,1);
    textSize(canvSize/5);
    fill(10,10,10);
    text("You Win!", canvSize/2,canvSize/3);
    textSize(canvSize/10);
    text("Click to restart",canvSize/2,(canvSize/5)*3);
    if (mouseIsPressed)
    {
      if (!mouseClickBool)
      {
        Nodes=[];
        MineDraw=[];
        PlacedMines=false;
        GameOver = false;
        Win = false;
        
        print(Nodes.length)
        foundMouseNode;
        
        for (var l=0; l<canvSize/nodeSize; l++)
        {
          for (var p=0; p<canvSize/nodeSize; p++)
          {
            Nodes.push(new Node(l, p));
            mouseClickBool=true;
          }
        }
      }
    }
    else
    {
      mouseClickBool=false;
    }
  }
}