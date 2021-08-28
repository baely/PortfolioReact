import { useEffect, useState } from 'react';
import './App.css';
import * as Icons from './images/tech/images';



const cardStackImages = {
    "py": Icons.iconPy,
    "ng": Icons.iconNg,
    "aws": Icons.iconAws,
    "lambda": Icons.iconLambda,
    "az": Icons.iconAz,
    "django": Icons.iconDjango,
    "gcp": Icons.iconGcp,
    "flask": Icons.iconFlask,
    "java": Icons.iconJava,
    ".net": Icons.iconCSharp,
    "react": Icons.iconReact,
    "psql": Icons.iconPsql,
    "azure-function": Icons.iconAzureFunction,
    "cosmos": Icons.iconCosmosDb,
    "gh": Icons.iconGithub,
    "cpp": Icons.iconCpp,
    "neo4j": Icons.iconNeo4j
}


function CardStack(props) {
    const label = (props.name in cardStackImages) ? (
        <img src={cardStackImages[props.name]} alt={"Logo for " + props.name} />
    ) : (
        <span>{props.name}</span>
    );

    return (
        <div className="stack-item">
            { label }
        </div>
    );
}


function Card(props) {
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
