import { useEffect, useState } from 'react';
// import logo from './logo.svg';
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
    "cosmos": Icons.iconCosmosDb
}


function CardStack(props) {
    console.log(props);

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
    console.log(props.data);
  return (
      <div className="project"><a href={props.data.url}>
          {/*<div className="display"><img src={props.data.img} alt="Project screenshot"/></div>*/}
          <label>Title</label><div className="title">{props.data.name}</div>
          <label>Description</label><div className="description">{props.data.description}</div>
          <label>Stack</label><div className="stack">
              {Object.keys(props.data.stack).map(k => <CardStack name={k} data={props.data.stack[k]} />)}
          </div>
      </a></div>
  );
}

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://baileyportfolio.azurewebsites.net/api/GetProjects")
        .then(res => res.json())
        .then(data => {
            setProjects(data.map(proj => <Card data={proj}/>));
        });
  }, []);

  return (
      <main>
          <div className="header">
              <h1>baely.co</h1>
          </div>
          <div className="project-list">
              { projects }
          </div>
      </main>

  );
}

export default App;
