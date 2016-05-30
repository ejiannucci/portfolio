var Header = React.createClass({
    render: function() {
        return (
        	<div className="header">
        		<h1>TEST</h1>
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" />
            </div>
        );
    }
});

React.render(<Header />, document.getElementById('header-container'));