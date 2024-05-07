run:
	gcloud functions deploy recommendation --runtime nodejs18 --trigger-http --entry-point app --allow-unauthenticated
