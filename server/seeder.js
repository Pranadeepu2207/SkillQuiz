const db = require("./models/index")

const { sequelize, Skill, Level, Question } = db

const seed = async () => {
    try {
        await sequelize.sync({ force: true })
        console.log("Db Reset")

        const skills = await Skill.bulkCreate([
            { name: "HTML & CSS", imageUrl: "https://res.cloudinary.com/dfsq067fd/image/upload/v1777979535/browser_1_d77rr3.png" },
            { name: "JavaScript", imageUrl: "https://res.cloudinary.com/dfsq067fd/image/upload/v1777979534/js_1_xn9bdv.png" },
            { name: "React", imageUrl: "https://res.cloudinary.com/dfsq067fd/image/upload/v1777979534/atom_o5ypif.png" },
            { name: "Node.js", imageUrl: "https://res.cloudinary.com/dfsq067fd/image/upload/v1777979535/node-js_uaz7gs.png" }
        ])

        const levels = await Level.bulkCreate([
            { name: 'Easy' },
            { name: 'Medium' },
            { name: 'Hard' }
        ])

        const skillMap = {}
        skills.forEach(skill => skillMap[skill.name] = skill.id)

        console.log("Skillmap:", skillMap)

        const levelMap = {}
        levels.forEach(level => levelMap[level.name] = level.id)

        console.log("Levelmap", levelMap)

        const questionsData = [

            /* ================= HTML & CSS ================= */

            // EASY (10)
            { skill: "HTML & CSS", level: "Easy", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine", "Hyperlinks", "None"], correctAnswer: "Hyper Text Markup Language" },
            { skill: "HTML & CSS", level: "Easy", question: "Tag for paragraph?", options: ["<p>", "<h1>", "<div>", "<span>"], correctAnswer: "<p>" },
            { skill: "HTML & CSS", level: "Easy", question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style", "Color Sheet", "None"], correctAnswer: "Cascading Style Sheets" },
            { skill: "HTML & CSS", level: "Easy", question: "Image tag?", options: ["<img>", "<image>", "<pic>", "<src>"], correctAnswer: "<img>" },
            { skill: "HTML & CSS", level: "Easy", question: "Text color property?", options: ["color", "font", "text", "bg"], correctAnswer: "color" },
            { skill: "HTML & CSS", level: "Easy", question: "Link tag?", options: ["<a>", "<link>", "<href>", "<url>"], correctAnswer: "<a>" },
            { skill: "HTML & CSS", level: "Easy", question: "Block element?", options: ["div", "span", "img", "a"], correctAnswer: "div" },
            { skill: "HTML & CSS", level: "Easy", question: "Padding means?", options: ["inner space", "outer space", "border", "margin"], correctAnswer: "inner space" },
            { skill: "HTML & CSS", level: "Easy", question: "Default position?", options: ["static", "relative", "absolute", "fixed"], correctAnswer: "static" },
            { skill: "HTML & CSS", level: "Easy", question: "Heading tag?", options: ["<h1>", "<p>", "<div>", "<span>"], correctAnswer: "<h1>" },

            // MEDIUM (10)
            { skill: "HTML & CSS", level: "Medium", question: "Flexbox axis?", options: ["main axis", "cross axis", "both", "none"], correctAnswer: "both" },
            { skill: "HTML & CSS", level: "Medium", question: "display flex?", options: ["layout", "color", "text", "border"], correctAnswer: "layout" },
            { skill: "HTML & CSS", level: "Medium", question: "position relative?", options: ["relative to itself", "viewport", "parent", "none"], correctAnswer: "relative to itself" },
            { skill: "HTML & CSS", level: "Medium", question: "z-index used for?", options: ["layering", "color", "size", "font"], correctAnswer: "layering" },
            { skill: "HTML & CSS", level: "Medium", question: "margin collapse?", options: ["yes", "no", "sometimes", "never"], correctAnswer: "yes" },
            { skill: "HTML & CSS", level: "Medium", question: "inline-block?", options: ["hybrid", "block", "inline", "none"], correctAnswer: "hybrid" },
            { skill: "HTML & CSS", level: "Medium", question: "grid system?", options: ["layout", "text", "color", "font"], correctAnswer: "layout" },
            { skill: "HTML & CSS", level: "Medium", question: "overflow hidden?", options: ["hide content", "scroll", "auto", "visible"], correctAnswer: "hide content" },
            { skill: "HTML & CSS", level: "Medium", question: "vh unit?", options: ["viewport height", "width", "text", "none"], correctAnswer: "viewport height" },
            { skill: "HTML & CSS", level: "Medium", question: "rem based on?", options: ["root", "parent", "self", "none"], correctAnswer: "root" },

            // HARD (10)
            { skill: "HTML & CSS", level: "Hard", question: "Specificity priority?", options: ["inline", "id", "class", "tag"], correctAnswer: "inline" },
            { skill: "HTML & CSS", level: "Hard", question: "Pseudo class?", options: [":hover", "::before", "div", "span"], correctAnswer: ":hover" },
            { skill: "HTML & CSS", level: "Hard", question: "::before is?", options: ["pseudo element", "class", "id", "tag"], correctAnswer: "pseudo element" },
            { skill: "HTML & CSS", level: "Hard", question: "position sticky?", options: ["relative+fixed", "absolute", "fixed", "none"], correctAnswer: "relative+fixed" },
            { skill: "HTML & CSS", level: "Hard", question: "grid vs flex?", options: ["2D vs 1D", "same", "none", "invalid"], correctAnswer: "2D vs 1D" },
            { skill: "HTML & CSS", level: "Hard", question: "calc() used for?", options: ["math ops", "style", "layout", "none"], correctAnswer: "math ops" },
            { skill: "HTML & CSS", level: "Hard", question: "object-fit?", options: ["image control", "text", "grid", "none"], correctAnswer: "image control" },
            { skill: "HTML & CSS", level: "Hard", question: "clip-path?", options: ["shape", "text", "color", "font"], correctAnswer: "shape" },
            { skill: "HTML & CSS", level: "Hard", question: "will-change?", options: ["performance", "style", "layout", "none"], correctAnswer: "performance" },
            { skill: "HTML & CSS", level: "Hard", question: "contain property?", options: ["performance", "layout", "color", "none"], correctAnswer: "performance" },


            /* ================= JAVASCRIPT ================= */

            // EASY (10)
            { skill: "JavaScript", level: "Easy", question: "let is?", options: ["variable", "loop", "function", "object"], correctAnswer: "variable" },
            { skill: "JavaScript", level: "Easy", question: "typeof null?", options: ["object", "null", "undefined", "string"], correctAnswer: "object" },
            { skill: "JavaScript", level: "Easy", question: "=== means?", options: ["strict equal", "assign", "not equal", "none"], correctAnswer: "strict equal" },
            { skill: "JavaScript", level: "Easy", question: "Array?", options: ["collection", "string", "object", "none"], correctAnswer: "collection" },
            { skill: "JavaScript", level: "Easy", question: "JS runs in?", options: ["browser", "cpu", "db", "kernel"], correctAnswer: "browser" },
            { skill: "JavaScript", level: "Easy", question: "function keyword?", options: ["function", "def", "fun", "none"], correctAnswer: "function" },
            { skill: "JavaScript", level: "Easy", question: "loop?", options: ["for", "repeat", "cycle", "none"], correctAnswer: "for" },
            { skill: "JavaScript", level: "Easy", question: "NaN?", options: ["not number", "number", "null", "none"], correctAnswer: "not number" },
            { skill: "JavaScript", level: "Easy", question: "undefined?", options: ["no value", "null", "0", "false"], correctAnswer: "no value" },
            { skill: "JavaScript", level: "Easy", question: "console.log?", options: ["print", "input", "store", "none"], correctAnswer: "print" },

            // MEDIUM (10)
            { skill: "JavaScript", level: "Medium", question: "closure?", options: ["scope+function", "loop", "object", "none"], correctAnswer: "scope+function" },
            { skill: "JavaScript", level: "Medium", question: "hoisting?", options: ["move declarations", "loop", "object", "none"], correctAnswer: "move declarations" },
            { skill: "JavaScript", level: "Medium", question: "promise?", options: ["async result", "sync", "loop", "none"], correctAnswer: "async result" },
            { skill: "JavaScript", level: "Medium", question: "async await?", options: ["handle async", "sync", "loop", "none"], correctAnswer: "handle async" },
            { skill: "JavaScript", level: "Medium", question: "map?", options: ["transform array", "loop", "filter", "none"], correctAnswer: "transform array" },
            { skill: "JavaScript", level: "Medium", question: "filter?", options: ["filter array", "map", "reduce", "none"], correctAnswer: "filter array" },
            { skill: "JavaScript", level: "Medium", question: "reduce?", options: ["accumulate", "loop", "filter", "none"], correctAnswer: "accumulate" },
            { skill: "JavaScript", level: "Medium", question: "this?", options: ["context", "object", "value", "none"], correctAnswer: "context" },
            { skill: "JavaScript", level: "Medium", question: "spread?", options: ["expand", "combine", "both", "none"], correctAnswer: "both" },
            { skill: "JavaScript", level: "Medium", question: "event loop?", options: ["async queue", "loop", "stack", "none"], correctAnswer: "async queue" },

            // HARD (10)
            { skill: "JavaScript", level: "Hard", question: "debounce?", options: ["delay execution", "loop", "sync", "none"], correctAnswer: "delay execution" },
            { skill: "JavaScript", level: "Hard", question: "throttle?", options: ["limit calls", "loop", "sync", "none"], correctAnswer: "limit calls" },
            { skill: "JavaScript", level: "Hard", question: "currying?", options: ["function chaining", "loop", "object", "none"], correctAnswer: "function chaining" },
            { skill: "JavaScript", level: "Hard", question: "prototype?", options: ["inheritance", "object", "class", "none"], correctAnswer: "inheritance" },
            { skill: "JavaScript", level: "Hard", question: "call/apply?", options: ["change context", "loop", "object", "none"], correctAnswer: "change context" },
            { skill: "JavaScript", level: "Hard", question: "bind?", options: ["bind context", "loop", "object", "none"], correctAnswer: "bind context" },
            { skill: "JavaScript", level: "Hard", question: "memoization?", options: ["cache result", "loop", "object", "none"], correctAnswer: "cache result" },
            { skill: "JavaScript", level: "Hard", question: "deep copy?", options: ["clone nested", "copy", "object", "none"], correctAnswer: "clone nested" },
            { skill: "JavaScript", level: "Hard", question: "shallow copy?", options: ["copy reference", "clone", "object", "none"], correctAnswer: "copy reference" },
            { skill: "JavaScript", level: "Hard", question: "symbol?", options: ["unique value", "string", "number", "none"], correctAnswer: "unique value" },


            /* ================= REACT ================= */

            // EASY (10)
            { skill: "React", level: "Easy", question: "React is?", options: ["Library", "Framework", "DB", "Language"], correctAnswer: "Library" },
            { skill: "React", level: "Easy", question: "JSX?", options: ["JS XML", "JS Code", "HTML", "None"], correctAnswer: "JS XML" },
            { skill: "React", level: "Easy", question: "Component?", options: ["Reusable UI", "CSS", "DB", "None"], correctAnswer: "Reusable UI" },
            { skill: "React", level: "Easy", question: "useState?", options: ["Hook", "Function", "Object", "None"], correctAnswer: "Hook" },
            { skill: "React", level: "Easy", question: "Props?", options: ["Input", "Output", "Hook", "None"], correctAnswer: "Input" },
            { skill: "React", level: "Easy", question: "Virtual DOM?", options: ["Optimized DOM", "Real DOM", "DB", "None"], correctAnswer: "Optimized DOM" },
            { skill: "React", level: "Easy", question: "Key prop?", options: ["Unique id", "Style", "Class", "None"], correctAnswer: "Unique id" },
            { skill: "React", level: "Easy", question: "State?", options: ["Data", "CSS", "HTML", "None"], correctAnswer: "Data" },
            { skill: "React", level: "Easy", question: "Hooks used in?", options: ["Function comp", "Class", "HTML", "None"], correctAnswer: "Function comp" },
            { skill: "React", level: "Easy", question: "ReactDOM?", options: ["Render", "Style", "DB", "None"], correctAnswer: "Render" },

            // MEDIUM (10)
            { skill: "React", level: "Medium", question: "useEffect?", options: ["side effects", "state", "props", "none"], correctAnswer: "side effects" },
            { skill: "React", level: "Medium", question: "lifting state?", options: ["shared state", "hook", "loop", "none"], correctAnswer: "shared state" },
            { skill: "React", level: "Medium", question: "controlled input?", options: ["state controlled", "dom", "none", "loop"], correctAnswer: "state controlled" },
            { skill: "React", level: "Medium", question: "memo?", options: ["optimize render", "state", "props", "none"], correctAnswer: "optimize render" },
            { skill: "React", level: "Medium", question: "context?", options: ["global state", "local", "none", "loop"], correctAnswer: "global state" },
            { skill: "React", level: "Medium", question: "router?", options: ["navigation", "state", "props", "none"], correctAnswer: "navigation" },
            { skill: "React", level: "Medium", question: "fragment?", options: ["no extra DOM", "div", "span", "none"], correctAnswer: "no extra DOM" },
            { skill: "React", level: "Medium", question: "lazy?", options: ["code splitting", "state", "props", "none"], correctAnswer: "code splitting" },
            { skill: "React", level: "Medium", question: "useRef?", options: ["reference", "state", "props", "none"], correctAnswer: "reference" },
            { skill: "React", level: "Medium", question: "render cycle?", options: ["update UI", "state", "props", "none"], correctAnswer: "update UI" },

            // HARD (10)
            { skill: "React", level: "Hard", question: "reconciliation?", options: ["diffing", "render", "loop", "none"], correctAnswer: "diffing" },
            { skill: "React", level: "Hard", question: "fiber?", options: ["engine", "loop", "state", "none"], correctAnswer: "engine" },
            { skill: "React", level: "Hard", question: "useMemo?", options: ["memoize value", "state", "props", "none"], correctAnswer: "memoize value" },
            { skill: "React", level: "Hard", question: "useCallback?", options: ["memoize fn", "state", "props", "none"], correctAnswer: "memoize fn" },
            { skill: "React", level: "Hard", question: "batching?", options: ["combine updates", "loop", "state", "none"], correctAnswer: "combine updates" },
            { skill: "React", level: "Hard", question: "SSR?", options: ["server render", "client", "loop", "none"], correctAnswer: "server render" },
            { skill: "React", level: "Hard", question: "hydration?", options: ["attach events", "loop", "state", "none"], correctAnswer: "attach events" },
            { skill: "React", level: "Hard", question: "portal?", options: ["render outside", "loop", "state", "none"], correctAnswer: "render outside" },
            { skill: "React", level: "Hard", question: "strict mode?", options: ["dev check", "prod", "loop", "none"], correctAnswer: "dev check" },
            { skill: "React", level: "Hard", question: "error boundary?", options: ["catch errors", "loop", "state", "none"], correctAnswer: "catch errors" },


            /* ================= NODE ================= */

            // EASY (10)
            { skill: "Node.js", level: "Easy", question: "Node.js?", options: ["runtime", "lang", "db", "framework"], correctAnswer: "runtime" },
            { skill: "Node.js", level: "Easy", question: "engine?", options: ["V8", "Java", "Python", "SQL"], correctAnswer: "V8" },
            { skill: "Node.js", level: "Easy", question: "npm?", options: ["package manager", "server", "db", "none"], correctAnswer: "package manager" },
            { skill: "Node.js", level: "Easy", question: "require?", options: ["import", "export", "loop", "none"], correctAnswer: "import" },
            { skill: "Node.js", level: "Easy", question: "express?", options: ["framework", "db", "os", "none"], correctAnswer: "framework" },
            { skill: "Node.js", level: "Easy", question: "fs?", options: ["file system", "server", "loop", "none"], correctAnswer: "file system" },
            { skill: "Node.js", level: "Easy", question: "json?", options: ["data format", "db", "loop", "none"], correctAnswer: "data format" },
            { skill: "Node.js", level: "Easy", question: "http?", options: ["server", "ui", "db", "none"], correctAnswer: "server" },
            { skill: "Node.js", level: "Easy", question: "event loop?", options: ["async", "loop", "sync", "none"], correctAnswer: "async" },
            { skill: "Node.js", level: "Easy", question: "callback?", options: ["function", "loop", "object", "none"], correctAnswer: "function" },

            // MEDIUM (10)
            { skill: "Node.js", level: "Medium", question: "middleware?", options: ["request handler", "db", "ui", "none"], correctAnswer: "request handler" },
            { skill: "Node.js", level: "Medium", question: "req/res?", options: ["request response", "db", "ui", "none"], correctAnswer: "request response" },
            { skill: "Node.js", level: "Medium", question: "async?", options: ["non blocking", "sync", "loop", "none"], correctAnswer: "non blocking" },
            { skill: "Node.js", level: "Medium", question: "promise?", options: ["async result", "loop", "sync", "none"], correctAnswer: "async result" },
            { skill: "Node.js", level: "Medium", question: "env?", options: ["config", "loop", "db", "none"], correctAnswer: "config" },
            { skill: "Node.js", level: "Medium", question: "cors?", options: ["cross origin", "db", "ui", "none"], correctAnswer: "cross origin" },
            { skill: "Node.js", level: "Medium", question: "body parser?", options: ["parse data", "db", "ui", "none"], correctAnswer: "parse data" },
            { skill: "Node.js", level: "Medium", question: "jwt?", options: ["auth token", "db", "ui", "none"], correctAnswer: "auth token" },
            { skill: "Node.js", level: "Medium", question: "status codes?", options: ["http codes", "db", "ui", "none"], correctAnswer: "http codes" },
            { skill: "Node.js", level: "Medium", question: "routes?", options: ["endpoints", "db", "ui", "none"], correctAnswer: "endpoints" },

            // HARD (10)
            { skill: "Node.js", level: "Hard", question: "cluster?", options: ["multi core", "single", "loop", "none"], correctAnswer: "multi core" },
            { skill: "Node.js", level: "Hard", question: "streams?", options: ["data flow", "loop", "sync", "none"], correctAnswer: "data flow" },
            { skill: "Node.js", level: "Hard", question: "buffer?", options: ["binary data", "string", "loop", "none"], correctAnswer: "binary data" },
            { skill: "Node.js", level: "Hard", question: "child process?", options: ["spawn process", "loop", "sync", "none"], correctAnswer: "spawn process" },
            { skill: "Node.js", level: "Hard", question: "event emitter?", options: ["event system", "loop", "sync", "none"], correctAnswer: "event system" },
            { skill: "Node.js", level: "Hard", question: "thread pool?", options: ["background tasks", "loop", "sync", "none"], correctAnswer: "background tasks" },
            { skill: "Node.js", level: "Hard", question: "load balancing?", options: ["traffic distribution", "loop", "sync", "none"], correctAnswer: "traffic distribution" },
            { skill: "Node.js", level: "Hard", question: "rate limit?", options: ["limit requests", "loop", "sync", "none"], correctAnswer: "limit requests" },
            { skill: "Node.js", level: "Hard", question: "compression?", options: ["reduce size", "loop", "sync", "none"], correctAnswer: "reduce size" },
            { skill: "Node.js", level: "Hard", question: "security headers?", options: ["protect app", "loop", "sync", "none"], correctAnswer: "protect app" }

        ];

        const formattedQuestions = questionsData.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            skillId: skillMap[q.skill],
            levelId: levelMap[q.level]
        }))

        await Question.bulkCreate(formattedQuestions)

        console.log("Seeding completed successfully");
        if (require.main === module) {
            process.exit();
        }

    } catch (error) {
        console.log("seeding error: ", error);
        if (require.main === module) {
            process.exit(1);
        }
    }
}

module.exports = seed;

if (require.main === module) {
    seed();
}