/**
 * Building a Company site (SPA) (summary)
 * See branch: feature/react-router (detailed)
 *
 */


// React Router


/**
 * Routing is the process of defining endpoints for your client’s requests.
 * These endpoints work in conjunction with the browser’s location and history objects.
 * They are used to identify requested content so that
 * JavaScript can load and render the appropriate UI.
 */


// We shall test case by building a simple company website.
// The sitemap for this website consists of a home page,
// a page for each section, and an error page to handle 404 Not Found errors.

// The router will allow us to set up routes for each section of the website.
// Each route is an endpoint that can be entered into the browser’s location bar.
// When a route is requested, we can render the appropriate content.


/**
 * HashRouter
 *
 * react-router-dom provides a couple of options for
 * managing the navigation history in single-page applications.
 *
 * The HashRouter was designed for the client.
 * Traditionally, hashes in the location bar were used to define anchor links.
 * When the # is used in the location bar, the browser does not make a server request.
 * When using the HashRouter, the # is always required before all routes.
 *
 * The HashRouter is a nice tool to use for new projects or
 * for small client sites that do not require a backend.
 * The BrowserRouter is a preferred solution for most production-ready apps.
 * We will discuss the BrowserRouter at a later stage,
 * when we cover universal applications.
 */


// Placeholder components for each section or page in the sitemap.
// We can export these components from a single file.

export const Home = () =>
    <section className="home">
        <h1>[Home Page]</h1>
    </section>

export const About = () =>
    <section className="events">
        <h1>[About the Company]</h1>
    </section>

export const Events = () =>
    <section className="events">
        <h1>[Events Calendar]</h1>
    </section>

export const Products = () =>
    <section className="products">
        <h1>[Products Catalog]</h1>
    </section>

export const Contact = () =>
    <section className="contact">
        <h1>[Contact Us]</h1>
    </section>


// When the application starts, instead of rendering a single App component,
// we will render the HashRouter component.

import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Home, About, Events, Products, Contact } from './pages';


window.React = React;

/**
 * The HashRouter component is rendered as the root component for our application.
 * Each route can be defined within the HashRouter using the Route component.
 * These routes tell the router which component to render when the window’s location changes.
 *
 * Each Route component has path and component properties.
 * When the browser’s location matches the path, the component will be displayed.
 * When the location is /, the router will render the Home component.
 * When the location is /products, the router will render the Products component.
 *
 * The first route, the one that displays the Home component, has an exact property.
 * This means that the Home component will only be displayed when
 * the location exactly matches the root /.
 *
 * At this point, we can run the app and physically type the routes into
 * the browser’s location bar to watch the content change.
 * For example, type http://localhost:3000/#/about into the
 * location bar and watch the About component render.
 */

render(
    <HashRouter>
        <div className="main">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/events" component={Events} />
            <Route path="/products" component={Products} />
            <Route path="/contact" component={Contact} />
        </div>
    </HashRouter>, document.getElementById('react-container')
);


// We do not expect our users to navigate the website by
// typing routes into the location bar.
// The react-router-dom provides a Link component that
// we can use to create browser links.

// Let’s modify the home page to contain
// a navigation menu with a link for each route.

import { Link } from 'react-router-dom';


export const Home = () => (
    <div className="home">
        <h1>[Company Website]</h1>
        <nav>
            <Link to="about">[About]</Link>
            <Link to="events">[Events]</Link>
            <Link to="products">[Products]</Link>
            <Link to="contact">[Contact Us]</Link>
        </nav>
    </div>
);

// Now users can access every internal page from the home page by clicking on a link.
// The browser’s back button will take them back to the home page.


// Router Properties


/**
 * The React Router passes properties to the components that it renders.
 * For instance, we can obtain the current location via a property.
 * Let’s use the current location to help us create a 404 Not Found component.
 */

export const Whoops404 = ({ location }) => (
    <div className="whoops-404">
        <h1>Resource not found at '{location.pathname}'</h1>
    </div>
);

// The Whoops404 component will be rendered by
// the router when users enter routes that have not been defined.
// Once rendered, the router will pass
// a location object to this component as a property.

// We can obtain and use this object to get the
// current pathname for the requested route.
// We will use this pathname to notify the user that
// we cannot find the resource that they have requested.

// Now let’s add the Whoops404 component to the application using a Route.

import { HashRouter, Route, Switch } from 'react-router-dom';

// Other
render(
    <HashRouter>
        <div className="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/events" component={Events} />
                <Route path="/products" component={Products} />
                <Route path="/contact" component={Contact} />
                <Route component={Whoops404} />
            </Switch>
        </div>
    </HashRouter>, document.getElementById('react-container')
);

// Since we only want to display the Whoops404 component when
// no other Route matches, we need to use the Switch component.
// The Switch component only displays the first route that matches.
// This assures that only one of these routes will be rendered.

// If none of the locations match a Route,
// the last route — the one that does not contain a path property — will be displayed.
// If you were to enter the route http://localhost:3000/#/profits,
// you would see 404 error page.


// Nesting Routes


// Route components are used with content that
// should be displayed only when specific URLs are matched.
// This feature allows us to organize our web apps into
// eloquent hierarchies that promote content reuse.
// In this section, we will also look at how content can be
// organized into subsections that contain submenus.


/**
 * Let’s consider the simple starter website.
 * Once inside, each section should display the same main menu.
 * The content on the right side of the screen should change as
 * the user navigates the website, but the content on the left side of
 * the screen should remain intact (see - /img/events-page.png).
 *
 * Let’s create a reusable PageTemplate component that
 * we can use as a template for these inside pages.
 * This component will always display the main menu,
 * but it will render nested content as users navigate the website.
 */


// First, we’ll need the MainMenu component:
import HomeIcon from 'react-icons/lib/fa/home';
import { NavLink } from 'react-router-dom';
import './stylesheets/menus.scss';


const selectedStyle = {
    backgroundColor: "white",
    color: "slategray"
};

export const MainMenu = () => (
    <nav className="main-menu">
        <NavLink to="/">
            <HomeIcon/>
        </NavLink>
        <NavLink to="/about" activeStyle={selectedStyle}>
            [About]
        </NavLink>
        <NavLink to="/events" activeStyle={selectedStyle}>
            [Events]
        </NavLink>
        <NavLink to="/products" activeStyle={selectedStyle}>
            [Products]
        </NavLink>
        <NavLink to="/contact" activeStyle={selectedStyle}>
            [Contact Us]
        </NavLink>
    </nav>
);


/**
 * The MainMenu component uses the NavLink component.
 * The NavLink component can be used to
 * create links that can be styled when they are active.
 * The activeStyle property can be used to set the CSS to
 * indicate which link is active or currently selected.
 */


// The MainMenu component will be used in the PageTemplate component.

import { MainMenu } from './ui/menus'

// Other
const PageTemplate = ({children}) => (
    <div className="page">
        <MainMenu />
        {children}
    </div>
);


// The children of the PageTemplate component are where each section will be rendered.
// Here, we are adding the children just after the MainMenu.
// Now we can compose our sections using the PageTemplate.


export const Events = () =>
	<PageTemplate>
		<section className="events">
			<h1>[Event Calendar]</h1>
		</section>
	</PageTemplate>

export const Products = () =>
	<PageTemplate>
		<section className="products">
			<h1>[Product Catalog]</h1>
		</section>
	</PageTemplate>

export const Contact = () =>
	<PageTemplate>
		<section className="contact">
			<h1>[Contact Us]</h1>
		</section>
	</PageTemplate>

export const About = ({ match }) =>
	<PageTemplate>
		<section className="about">
			<h1>About</h1>
		</section>
	</PageTemplate>


// If you run the application, 
// you will see that each section now displays the same MainMenu. 
// The content on the right side of the screen changes as 
// you navigate through the interior pages of the website.


// Subsections and Submenus


/**
 * Next, we will nest four components under 
 * the About section using the <Route> component.
 * # (see- fast-react/img/subpages.png)
 * We need to add pages for Company, History, Services, and Location.
 * When the user selects the About section, 
 * they should be defaulted to the Company page under that section.
 */


/**
 * The new routes that we need to create will reflect this hierarchy:
 * • http://localhost:3000/
 *      —http://localhost:3000/#/about
 *          —http://localhost:3000/#/about
 *          —http://localhost:3000/#/about/history
 *          —http://localhost:3000/#/about/services
 *          —http://localhost:3000/#/about/location
 *      —http://localhost:3000/#/events
 *      —http://localhost:3000/#/products
 *      —http://localhost:3000/#/contact
 * • http://localhost:3000/#/foo-bar
 */


// Let’s create a submenu for the "About" section. 
// We will use NavLink components and set the activeStyle to 
// the same activeStyle used in the MainMenu.


export const AboutMenu = ({match}) => (
    /**
     * The AboutMenu component uses NavLink components to
     * direct users to interior content under the About section.
     * This component will be rendered using a Route which means that it receives routing properties.
     * We need to use the match property that is sent to this component from the Route.
     * 
     * All of the NavLink components use the activeStyle property except for the first one.
     * The activeStyle will set the style property for the link when
     * the location matches to the link’s route.
     * For instance, when the user navigates to http://localhost:3000/#/about/services,
     * the Services NavLink will render a white background.
     * 
     * The first NavLink component does not use activeStyle.
     * Instead, the style property is set to the selectedStyle only 
     * when the route matches exactly /about.
     * The match.isExact property is true when the location is /about and
     * false when the location is /about/services.
     * Technically the /about route matches for both locations,
     * but it is only an exact match when the location is /about.
     */

    <div className="about-menu">
        <li>
            <NavLink to="/about" style={match.isExact && selectedStyle}>
                [Company]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/history" activeStyle={selectedStyle}>
                [History]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/services" activeStyle={selectedStyle}>
                [Services]
            </NavLink>
        </li>
        <li>
            <NavLink to="/about/location" activeStyle={selectedStyle}>
                [Location]
            </NavLink>
        </li>
    </div>
);


// Placeholder Components


/**
 * We also need to remember to stub placeholder components for our new sections:
 * Company, Services, History, and Location.
 * Here is an example of the Services placeholder.
 * It simply displays some text for now.
 */


export const Services = () => (
    <section className="services">
        <h2>Our Services</h2>
        <p>text...</p>
    </section>
);


// Now we are ready to add routes to the About component.

export const About = ({ match }) => (
    /**
     * This About component will be reused across the entire section.
     * The location will tell the app which subsection to render. 
     * For example, when the location is http://localhost:3000/#/about/history, 
     * the History component will be rendered inside of the About component.
     * 
     * This time, we are not using a Switch component. 
     * Any Route that matches the location will render its associated component. 
     * The first Route will always display the AboutMenu. 
     * Additionally, any other Routes that match will render their components as well. 
     */
    <PageTemplate>
        <section className="about">
            <Route component={AboutMenu} />
            <Route exact path="/about" component={Company}/>
            <Route path="/about/history" component={History}/>
            <Route path="/about/services" component={Services}/>
            <Route path="/about/location" component={Location}/>
        </section>
    </PageTemplate>
);


// Using redirects


/**
 * Sometimes you want to redirect users from one route to another. 
 * For instance, we can make sure that if users try 
 * to access content via http://localhost:3000/services,
 * they get redirected to the correct route: http://localhost:3000/#/about/services.
 */


//  Let’s modify our application to include redirects to 
// ensure that our users can access the correct content. 

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
 
// Other...
render(
    // The Redirect component allows us to redirect the user to a specific route.    
    <HashRouter>
        <div className="main">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Redirect from="/history" to="/about/history" />
                <Redirect from="/services" to="/about/services" />
                <Redirect from="/location" to="/about/location" />
                <Route path="/events" component={Events} />
                <Route path="/products" component={Products} />
                <Route path="/contact" component={Contact} />
                <Route component={Whoops404} />
            </Switch>
        </div>
    </HashRouter>, document.getElementById('react-container')
);
