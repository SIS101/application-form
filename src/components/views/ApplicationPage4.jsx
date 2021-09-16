import React from 'react';
import {Link} from 'react-router-dom';
import FormData from 'form-data';
import RenderResponse from '../RenderResponse';
import axios from 'axios';
import { baseUrl } from '../custom_modules/api_config';
import M from 'materialize-css/dist/js/materialize';

class ApplicationPage4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondary_school_attended: '',
            english_language: '',
            mathematics: '',
            biology: '',
            science: '',
            physics: '',
            chemistry: '',
            agricultural_science: '',
            history: '',
            commerce: '',
            civic_education: '',
            local_language: '',
            food_nutrition_and_home_management: '',
            religious_education: '',
            english_literature: '',
            principles_of_accounts: '',
            human_and_social_biology: '',
            geometrical_and_mechanical_drawing: '',
            metal_work: '',
            geography: '',
            nutrition: '',
            wood_work: '',
            art: '',
            information_technology: '',
            response: false
        };
        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);

        this.auth = sessionStorage.getItem('api_token') || null;
        this.response = null;
        this.application = null;
    }

    getApplication(){
        var p = this;
        p.setState({loading: true});
        axios.get(baseUrl+'/application/get?api_token='+this.auth).then(function(response){
            p.application = response.data;
            p.setState({response: true,loading: false});
            p.loadApplication();
        }).catch(function(error){
            if(error.response){
                p.application = error.response.data;
                p.setState({response: true,loading: false});
                p.setState({loading: false});
            } else if(error.request){
                alert(error.message);
                p.setState({loading: false});
            } else {
                alert(error.message);
                p.setState({loading: false});
            }
        });
    }

    loadApplication(){
        if(this.application){
            if(this.application.success){
                this.setState({
                    secondary_school_attended: this.application.data.secondary_school_attended,
                    english_language: this.application.data.english_language,
                    mathematics: this.application.data.mathematics,
                    biology: this.application.data.biology,
                    science: this.application.data.science,
                    physics: this.application.data.physics,
                    chemistry: this.application.data.chemistry,
                    agricultural_science: this.application.data.agricultural_science,
                    history: this.application.data.history,
                    commerce: this.application.data.commerce,
                    civic_education: this.application.data.civic_education,
                    local_language: this.application.data.local_language,
                    food_nutrition_and_home_management: this.application.data.food_nutrition_and_home_management,
                    religious_education: this.application.data.religious_education,
                    english_literature: this.application.data.english_literature,
                    principles_of_accounts: this.application.data.principles_of_accounts,
                    human_and_social_biology: this.application.data.human_and_social_biology,
                    geometrical_and_mechanical_drawing: this.application.data.geometrical_and_mechanical_drawing,
                    metal_work: this.application.data.metal_work,
                    geography: this.application.data.geography,
                    nutrition: this.application.data.nutrition,
                    wood_work: this.application.data.wood_work,
                    art: this.application.data.art,
                    information_technology: this.application.data.information_technology
                });
            }
        }
    }

    componentDidMount(){
        this.getApplication();
        M.updateTextFields();
    }

    handle_submit(event){
        event.preventDefault();
        this.setState({loading: true});
        //var FormData = require('form-data');
        var data = new FormData();
        data.append('secondary_school_attended', this.state.secondary_school_attended);
        data.append('english_language', this.state.english_language);
        data.append('mathematics', this.state.mathematics);
        data.append('biology', this.state.biology);
        data.append('science', this.state.science);
        data.append('physics', this.state.physics);
        data.append('chemistry', this.state.chemistry);
        data.append('agricultural_science', this.state.agricultural_science);
        data.append('history', this.state.history);
        data.append('commerce', this.state.commerce);
        data.append('civic_education', this.state.civic_education);
        data.append('local_language', this.state.local_language);
        data.append('food_nutrition_and_home_management', this.state.food_nutrition_and_home_management);
        data.append('religious_education', this.state.religious_education);
        data.append('english_language', this.state.english_language);
        data.append('principles_of_accounts', this.state.principles_of_accounts);
        data.append('human_and_social_biology', this.state.human_and_social_biology);
        data.append('geometrical_and_mechanical_drawing', this.state.geometrical_and_mechanical_drawing);
        data.append('metal_work', this.state.metal_work);
        data.append('geography', this.state.geography);
        data.append('nutrition', this.state.nutrition);
        data.append('wood_work', this.state.wood_work);
        data.append('art', this.state.art);
        data.append('information_technology', this.state.information_technology);

        var p = this;
        axios.post(baseUrl+'/application/four?api_token='+this.auth, data).then(function(response){
            p.setState({response: true, loading: false});
            p.response = response.data;
            p.handleResponse();
        }).catch(function(error){
            if(error.response){
                p.response = error.response.data;
                p.setState({response: true, loading: false});
                p.handleResponse();
            } else if(error.request){
                alert(error.message);
                p.setState({loading: false});
            } else {
                alert(error.message);
                p.setState({loading: false});
            }
        });
    }

    handleResponse(){
        var response = this.response;
        if(response){
            if(response.success){
                alert(response.message);
                this.props.history.push('/page/5');
            } else {
                if(typeof(response.message) == 'object'){
                    var message = "";
                    for(const [key, value] of Object.entries(response.message)){
                        message += `${key}: ${value}`;
                    }
                    alert(message);
                }
            }
        }
    }

    handle_change(event){
        switch (event.target.id) {
            case 'secondary_school_attended':
                this.setState({secondary_school_attended: event.target.value})
                break;
            case 'english_language':
                this.setState({english_language: event.target.value})
                break;
            case 'mathematics':
                this.setState({mathematics: event.target.value})
                break;
            case 'biology':
                this.setState({biology: event.target.value})
                break;
            case 'science':
                this.setState({science: event.target.value})
                break;
            case 'physics':
                this.setState({physics: event.target.value})
                break;
            case 'chemistry':
                this.setState({chemistry: event.target.value})
                break;
            case 'agricultural_science':
                this.setState({agricultural_science: event.target.value})
                break;
            case 'history':
                this.setState({history: event.target.value})
                break;
            case 'commerce':
                this.setState({commerce: event.target.value})
                break;
            case 'civic_education':
                this.setState({civic_education: event.target.value})
                break;
            case 'local_language':
                this.setState({local_language: event.target.value})
                break;
            case 'food_nutrition_and_home_management':
                this.setState({food_nutrition_and_home_management: event.target.value})
                break;
            case 'religious_education':
                this.setState({religious_education: event.target.value})
                break;
            case 'english_literature':
                this.setState({english_literature: event.target.value})
                break;
            case 'principles_of_accounts':
                this.setState({principles_of_accounts: event.target.value})
                break;
            case 'human_and_social_biology':
                this.setState({human_and_social_biology: event.target.value})
                break;
            case 'geometrical_and_mechanical_drawing':
                this.setState({geometrical_and_mechanical_drawing: event.target.value})
                break;
            case 'metal_work':
                this.setState({metal_work: event.target.value})
                break;
            case 'geography':
                this.setState({geography: event.target.value})
                break;
            case 'nutrition':
                this.setState({nutrition: event.target.value})
                break;
            case 'wood_work':
                this.setState({wood_work: event.target.value})
                break;
            case 'art':
                this.setState({art: event.target.value})
                break;
            case 'information_technology':
                this.setState({information_technology: event.target.value})
                break;
            default:
                break;
        }
    }

    render(){
        var response = this.state.response;
        if(this.auth === null){
            return(
                <div className="card indigo-text darken-4">
                    <div className="card-content">
                        <span className="card-title">Online Application Grade 12 Results</span>
                        <Link className="btn indigo darken-4" to='/login'>Login</Link>
                    </div>
                    <div className="card-action">
                    <Link className="btn indigo darken-4" to="/">Exit</Link>
                    </div>
                </div>
            );
        }
        return(
            <div className="card indigo-text darken-4">
                <div className="card-content">
                    <span className="card-title">Online Application Grade 12 Results</span>
                    <form onSubmit={this.handle_submit}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.secondary_school_attended} id="secondary_school_attended" type="text" className="validate" required />
                                <label htmlFor="secondary_school_attended">Secondary School Results</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.english_language} id="english_language" type="number" className="validate" required />
                                <label htmlFor="english_language">English language</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.mathematics} id="mathematics" type="number" className="validate" required />
                                <label htmlFor="mathematics">Mathematics</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.biology} id="biology" type="number" className="validate" required />
                                <label htmlFor="biology">Biology</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.science} id="science" type="number" className="validate" required />
                                <label htmlFor="science">Science</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.physics} id="physics" type="number" className="validate" required />
                                <label htmlFor="physics">Physics</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.chemistry} id="chemistry" type="number" className="validate" required />
                                <label htmlFor="chemistry">Chemistry</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.agricultural_science} id="agricultural_science" type="number" className="validate" required />
                                <label htmlFor="agricultural_science">Agricultural Science</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.history} id="history" type="number" className="validate" required />
                                <label htmlFor="history">History</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.commerce} id="commerce" type="number" className="validate" required />
                                <label htmlFor="commerce">Commerce</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.civic_education} id="civic_education" type="number" className="validate" required />
                                <label htmlFor="civic_education">Civic Education</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.local_language} id="local_language" type="number" className="validate" required />
                                <label htmlFor="local_language">Local Language</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.food_nutrition_and_home_management} id="food_nutrition_and_home_management" type="number" className="validate" required />
                                <label htmlFor="food_nutrition_and_home_management">Food Nutrition And Home Management</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.religious_education} id="religious_education" type="number" className="validate" required />
                                <label htmlFor="religious_education">Religious Education</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.english_literature} id="english_literature" type="number" className="validate" required />
                                <label htmlFor="english_literature">English Literature</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.principles_of_accounts} id="principles_of_accounts" type="number" className="validate" required />
                                <label htmlFor="principles_of_accounts">Principles Of Accounts</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.human_and_social_biology} id="human_and_social_biology" type="number" className="validate" required />
                                <label htmlFor="human_and_social_biology">Human And Social Biology</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.geometrical_and_mechanical_drawing} id="geometrical_and_mechanical_drawing" type="number" className="validate" required />
                                <label htmlFor="geometrical_and_mechanical_drawing">Geometrical And Mechanical Drawing</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.metal_work} id="metal_work" type="number" className="validate" required />
                                <label htmlFor="metal_work">Metal Work</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.geography} id="geography" type="number" className="validate" required />
                                <label htmlFor="geography">Geography</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.nutrition} id="nutrition" type="number" className="validate" required />
                                <label htmlFor="nutrition">Nutrition</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.wood_work} id="wood_work" type="number" className="validate" required />
                                <label htmlFor="wood_work">Wood Work</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.art} id="art" type="number" className="validate" required />
                                <label htmlFor="art">Art</label>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="..." onChange={this.handle_change} value={this.state.information_technology} id="information_technology" type="number" className="validate" required />
                                <label htmlFor="information_technology">Information Technology</label>
                            </div>
                            <button className="btn indigo darken-4">Proceed</button>
                        </div>
                    </form>
                    <RenderResponse isLoading={this.state.loading} response={response} />
                </div>
                <div className="card-action">
                <Link className="btn indigo darken-4" to="/">Back</Link>
                </div>
            </div>
        );
    }
}

export default ApplicationPage4;