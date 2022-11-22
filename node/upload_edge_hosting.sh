# Zips the node & commons folders and uploads it to the server

user=root
ip=64.227.181.87
location=/home/Development/EdgeHosting
timestamp=`date +%s | cut -b1-13`

folder="builds"
rel_folder="node/$folder"

[ -d $folder ] || mkdir $folder

filename="build_$timestamp.zip"

echo "(0/3) Creating Build (in $folder): $filename"
echo "(0/3) Will be uploaded to (@remote): $location"

echo '(1/3) Zipping contents...'

(cd .. && zip -q -r $filename ./node ./commons ./db -x *node_modules*)

echo "(2/3) Moving to $folder folder"

(cd .. && mv $filename $rel_folder)

echo '(3/3) Uploading...'

# scp $filename root@64.227.181.87:/home/Development/ScpTest
scp "$folder/$filename" $user@$ip:$location

echo '(3/3) Done!'