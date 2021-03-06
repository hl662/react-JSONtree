const objInp = {
    "Colors": {
        "Red": {},
        "Blue": {},
        "Green": {
            "The color of leaves": {},
            "The color of grass": {},
        }
    },
    "Animals": {
        "Red pandas": {
            "Are amazing": {},
        },
        "Cats": {},
    },
}

class Child extends React.Component {
    render() {
        return (
            <li>{this.props.value}{this.props.children}</li>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.jsonData,
        };
    }

    hasChildren = (node) => {
        return (typeof node === 'object')
            && (Object.values(node).length > 0)
    }

    list(node) {
        let data = Object.values(node);
        const children = (data) => {
            if (this.hasChildren(data)) {
                return <ul>{this.list(data)}</ul>
            }
            
        }
        let entries = Object.entries(node);
        return entries.map((entry,index) => {
            return <Child key={index} value={entry[0]}>{children(entry[1])}</Child>
        })
    }
    

    render() {
        return (
            <ul>{this.list(this.state.data)}</ul>
        );
    }
}

const domContainer = document.getElementById('container');
ReactDOM.render(<List jsonData={objInp} />, domContainer);
