package_name=钉钉安装包
target_dir=dist/$(package_name)
compile_less:
	lessc custom.less custom.css
build:compile_less
	electron-builder
dev:compile_less
	electron .
package:
	@if [ ! -d $(target_dir) ]; then \
	   mkdir $(target_dir);  \
	fi
	cp install.sh dingding.ico dingding.desktop "dist/dingding 1.0.0.AppImage"  $(target_dir) \
	&& tar -czf $(package_name).tar.gz -Cdist $(package_name)
install:
	./install.sh