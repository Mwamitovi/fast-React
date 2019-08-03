Color Organizer Lifecycle
=========================

## SYNOPSIS

This is a modified version of the color organizer,
(see branch- feature/color-organizer-app). 
The Color component has ben improved with some updating lifecycle methods.


### Configure

   - To follow-closely, look for summarized verion of the app within
     folder `color-organizer-app/color-organizer-app.js`

   - Study the "package.json" and "color.webpack.config.js", 
     that is where the main file conventions/standards are located.

   - Run `npm run-script start-color` to launch the app.
     Behind the scenes, this script initiates a sequence of commands.
      - prestart-color: `npm run build-color` that initiates webpack processes.
      - build-color: `webpack --progress --config color.webpack.config.js` lanches webpack to build the app.
      - start-color: `http://localhost:3000 & httpster -p 3000 -d ./color-organizer-app/dist` 
        launches server at port 3000, and loads the contents of dist/ folder.

   - And thus we have the stateful "color-organizer-app" with a "single state of truth".


### Lifecycle methods

``` JavaScript

    class Color extends Component {

        componentWillMount() {
            this.style = { backgroundColor: "#CCC" }
        }

        shouldComponentUpdate(nextProps) {
            const { rating } = this.props
            return rating !== nextProps.rating
        }

        componentWillUpdate(nextProps) {
            const { title, rating } = this.props
            this.style = null
            this.refs.title.style.backgroundColor = "red"
            this.refs.title.style.color = "white"
            alert(`${title}: rating ${rating} -> ${nextProps.rating}`)
        }

        componentDidUpdate(prevProps) {
            const { title, rating } = this.props
            const status = (rating > prevProps.rating) ? 'better' : 'worse'
            console.log(`${title} is getting ${status}`)
            this.refs.title.style.backgroundColor = ""
            this.refs.title.style.color = "black"
        }

        render() {
            const { title, color, rating, onRemove, onRate} = this.props
            return (
                <section className="color" style={this.style}>
                    <h1 ref="title">{title}</h1>
                    <button onClick={onRemove}>X</button>
                    <div className="color"
                         style={{ backgroundColor: color }}>
                    </div>
                    <div>
                        <StarRating starsSelected={rating} onRate={onRate}/>
                    </div>
                </section>
            )
        }

    }
```


### Further help

    - This project reference: Learning React (Functional Web development with React & Redux)
      available at http://bit.ly/learning-react-2e

    - To know more about node-sass, see https://www.npmjs.com/package/node-sass#readme

    - Want to utilize httpster more, read https://www.npmjs.com/package/httpster#readme

    - Read more about UUID, at https://secure.travis-ci.org/kelektiv/node-uuid.svg?branch=master
      and the [RFC4122] http://www.ietf.org/rfc/rfc4122.txt


### Contribution guidelines
   - Gitflow remote collaboration model
   - Code review (pull requests)
   - Writing tests (Unit and Functional tests)
   - Other guidelines shall be issued with time.

### Who i talk to?
   - Contact: @MwamiTovi on GitHub
   - Email directly: matovu.synergy@gmail.com
