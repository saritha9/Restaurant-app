import React, { Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoryItems from './categoryItems.js';
import '../App.css';

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			catItems: [],
			selCat: [],
			show: false
		}
	}

	componentDidMount() {
		axios.get('https://stream-restaurant-menu-svc.herokuapp.com/category')
			.then(response => {
				console.log(response.data);
				this.setState({
					categories: response.data
				})
			})
			.catch(error => console.log(error))
	}

	getCatItems = (category,id) => {
		axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/item?category=${category.short_name}`)
			.then(response => {
				this.setState({
					catItems: response.data,
					selCat: category,
					show: true,
				})
			})
			.catch(error => console.log(error))
	}

	render() {
		return (
			<div>
				<div className="catList">
					<h4>Menu Categories</h4>

					{this.state.categories.map((category) => (
						<li className="list-style" key={category.id}>
							<Link to={`#/items/${category.short_name}`} onClick={() => this.getCatItems(category,category.id)}>
								{category.name} - ({category.short_name})
							</Link>
						</li>
					))}
				</div>
				{this.state.show ? <CategoryItems catItems={this.state.catItems} selCat={this.state.selCat}></CategoryItems> : '' }
			</div>
		)
	}

}

export default Categories;
