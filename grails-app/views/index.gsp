<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="${resource(dir: 'css', file: 'bootstrap.css')}" type="text/css">
<link rel="stylesheet"
	href="${resource(dir: 'font-awesome/css', file: 'font-awesome.min.css')}"
	type="text/css">

<style type="text/css">
html,body
{
    height: 100%;
}
body
{
  	display: table; 
  	margin: 0 auto;
	background: rgba(255,255,255,1);
	background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -webkit-gradient(radial, center center, 0px, center center, 100%, , color-stop(0%, rgba(255,255,255,1)), color-stop(70%, rgba(230,230,230,1)), color-stop(100%, rgba(214,214,214,1)));
	background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	background: radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 70%, rgba(214,214,214,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d6d6d6', GradientType=1 );

}
.redirectPanel
{  
    height: 100%;
    display: table-cell;   
    vertical-align: middle;
    width:200px;
    height:200px;   
}

</style>

</head>
<body>
	<div class="redirectPanel">			
		<a class="btn btn-default btn-lg btn-block" href="login/" role="button">
			<i class="fa fa-keyboard-o fa-fw"></i> Administrator
		</a>
		<a class="btn btn-default btn-lg btn-block" href="client/" role="button">
			<i class="fa fa-calendar fa-fw"></i> Plan przyjęć
		</a>
	</div>
</body>
</html>