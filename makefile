run:
	gcloud functions deploy recommendation --runtime nodejs18 --trigger-topic recommendation-service --entry-point app --allow-unauthenticated


set: 
	export GOOGLE_APPLICATION_CREDENTIALS="/home/diani/Downloads/soa-gr6-p3-c59dcdd7fa7a.json"
	gcloud config set project soa-gr6-p3
