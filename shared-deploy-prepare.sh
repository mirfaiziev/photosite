rm -rf deployment;
mkdir deployment;
cp -r config public_html src templates translations vendor deployment;
mkdir -p deployment/var ;
cp .remote_config/.htaccess .remote_config/.htpasswd deployment/public_html
zip -r deployment/vendor.zip deployment/vendor/
zip -r deployment/code.zip config public_html src templates translations

# lite
#
# cp -r config public_html src templates translations deployment;
