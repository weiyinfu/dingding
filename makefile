package_name=钉钉安装包
target_dir=$(HOME)/Desktop
app_name=dingding-1.0.0.AppImage
compile_less:
	lessc custom.less custom.css
build:compile_less
	electron-builder
dev:compile_less
	electron .
package:
	@if [ ! -d $(target_dir)/$(package_name) ]; then \
	   mkdir $(target_dir)/$(package_name);  \
	fi
	cp install.sh dingding.ico dingding.desktop "dist/$(app_name)"  $(target_dir)/$(package_name) \
	&& tar -zcvf $(target_dir)/$(package_name).tar.gz -C$(target_dir) $(package_name) 
	@echo "压缩包已生成，请前往${target_dir}/$(package_name)查看"
install:
	./install.sh
see:
	echo $(package_name)
	echo $(shell dirname $(package_name))
	echo $(shell basename $(package_name))
	echo `dirname $(package_name)`