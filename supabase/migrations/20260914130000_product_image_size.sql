-- Raise product image upload limit (was 10MB)
update storage.buckets
set file_size_limit = 104857600
where id = 'product-images';
