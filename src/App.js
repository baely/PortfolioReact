import { useEffect, useState } from 'react';
import './App.css';
import * as Icons from './images/tech/images';



const cardStackImages = {
    "py": {"icon": Icons.iconPy, "tooltip": "Python"},
    "ng": {"icon": Icons.iconNg, "tooltip": "Angular"},
    "aws": {"icon": Icons.iconAws, "tooltip": "AWS"},
    "lambda": {"icon": Icons.iconLambda, "tooltip": "AWS Lambda"},
    "az": {"icon": Icons.iconAz, "tooltip": "Azure"},
    "django": {"icon": Icons.iconDjango, "tooltip": "Django"},
    "gcp": {"icon": Icons.iconGcp, "tooltip": "GCP"},
    "flask": {"icon": Icons.iconFlask, "tooltip": "Flask"},
    "java": {"icon": Icons.iconJava, "tooltip": "Java"},
    ".net": {"icon": Icons.iconCSharp, "tooltip": "C# .NET"},
    "react": {"icon": Icons.iconReact, "tooltip": "React"},
    "psql": {"icon": Icons.iconPsql, "tooltip": "Postgresql"},
    "azure-function": {"icon": Icons.iconAzureFunction, "tooltip": "Azure Function"},
    "cosmos": {"icon": Icons.iconCosmosDb, "tooltip": "Azure Cosmos DB"},
    "gh": {"icon": Icons.iconGithub, "tooltip": "Github"},
    "cpp": {"icon": Icons.iconCpp, "tooltip": "C++"},
    "neo4j": {"icon": Icons.iconNeo4j, "tooltip": "Neo4j"},
    "discord": {"icon": Icons.iconDiscord, "tooltip": "Discord"}
}


function HoverText(props) {
    return (
        <div className={"hover-text-parent " + props.className}>
            <div className="hover-text">{props.text}</div>
            {props.children}
        </div>
    );
}


function CardStack(props) {
    const label = (props.name in cardStackImages) ? (
        <img src={cardStackImages[props.name].icon} alt={"Logo for " + props.name} title={cardStackImages[props.name].tooltip} />
    ) : (
        <span>{props.name}</span>
    );

    return (<>{ props.data.length === 0 ?
        <div className="stack-item">{label}</div> :
        <HoverText className="stack-item" text={props.data}>{label}</HoverText>
    }</>);
}


function Card(props) {
    props.data.url = props.data.id === "portfolio" ? window.location.href : props.data.url;

  return (
      <div className="project">{props.data.url.length>0 ? (
          <a href={props.data.url} target="_blank" rel="noreferrer">
          {/*<div className="display"><img src={props.data.img} alt="Project screenshot"/></div>*/}
          <label>Title</label><div className="title">{props.data.name}</div>
          <label>Description</label><div className="description">{props.data.description}</div>
          <label>Stack</label><div className="stack">
              {Object.keys(props.data.stack).map(k => <CardStack name={k} data={props.data.stack[k]} />)}
          </div></a>
      ) : (
          <span className="no-link">
          <label>Title</label><div className="title">{props.data.name}</div>
          <label>Description</label><div className="description">{props.data.description}</div>
          <label>Stack</label><div className="stack">
      {Object.keys(props.data.stack).map(k => <CardStack name={k} data={props.data.stack[k]} />)}
          </div>
          </span>
      )}</div>
  );
}

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("//baileyportfolio.azurewebsites.net/api/GetProjects")
        .then(res => res.json())
        .then(data => {
            setProjects(data.map(proj => <Card data={proj}/>));
        });
  }, []);

  document.title = window.location.hostname;

  return (
      <main>
          <div className="header">
              <h1>{ window.location.hostname }<span className="unbold"> | Portfolio</span></h1>
          </div>
          <div className="project-list">
              { projects }
          </div>
      </main>

  );
}

export default App;
