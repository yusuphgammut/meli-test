import * as React from 'react';
import {Link} from 'react-router-dom';

import './navBar.scss';

const searchbarLabel = 'Escribe tu búsqueda';

/**
 * Navigarion bar component.
 *
 * @returns {object} Navigation bar component.
 */
export default function NavBar() {
	return (
		<div className="navbar__container">
			<div className="navbar__wrapper ut-grid-container">
				<div className="navbar__logo-container">
					<Link to="/">
						<img
							srcSet="/assets/logo-ml.png, /assets/logo-ml-2x.png 2x"
							src="/assets/logo-ml.png"
							alt="Ir al inicio"
							className="navbar__logo"
						/>
					</Link>
				</div>
				<form
					name="ml-search"
					method="GET"
					action="/items"
					className="navbar__search-container"
				>
					<div className="navbar__searchbar">
						<input
							type="text"
							id="searchbar"
							name="search"
							className="navbar__input"
						/>
						<label
							htmlFor="searchbar"
							className="ut-visually-hidden"
						>
							{searchbarLabel}
						</label>
						<button
							type="submit"
							className="navbar__btn"
							aria-label="Buscar"
						>
							<img
								srcSet="/assets/icon-search.png, /assets/icon-search-2x.png 2x"
								src="/assets/icon-search.png"
								alt=""
							/>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
