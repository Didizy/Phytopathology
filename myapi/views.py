import re

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *


class KnowledgeBaseView(APIView):
    def get(self, arg):
        attrs = Attributes.objects.order_by('pathology')
        serializer = AttributesSerializer(attrs, many=True)

        return Response(serializer.data)

    def post(self, request):
        if KnowledgeBase.objects.filter(pathology_name=request.data["name"]).first():
            print("Такой объект уже существует")
            return Response("Такой объект уже существует")
        else:
            new_pat = KnowledgeBase(pathology_name=request.data["name"])
            new_pat.save()
            print("Патология добавлена")
            return Response("Патология добавлена")

    def delete(self, request):
        if KnowledgeBase.objects.filter(pathology_name=request.data["name"]).first():
            del_pat = KnowledgeBase.objects.filter(pathology_name=request.data["name"]).first()
            del_pat.delete()
            print("Патология удалена")
            return Response("Патология удалена")
        else:
            print("Патология не найдена")
            return Response("Патология не найдена")


class AttributesView(APIView):
    def get(self, request):
        data = set(list(Attributes.objects.values_list('attr_name', flat=True)))
        print(data)
        return Response(data)

    # Добавление
    def post(self, request):
        if Attributes.objects.filter(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                attr_name=request.data['name']).first():
            print("Такой объект уже существует")
            return Response("Такой объект уже существует")
        else:
            if check_input(request.data['value'], request.data['type']):
                new_attr = Attributes(
                    pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                    attr_name=request.data['name'],
                    attr_value=request.data['value'], attr_type=request.data['type'])
                new_attr.save()
                print("Объект добавлен")
                return Response("Объект добавлен")
            else:
                return Response("Ошибка ввода")

    # Обновление
    def put(self, request):
        if Attributes.objects.filter(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                attr_name=request.data['name']).first():
            if check_input(request.data['value'], list(Attributes.objects.filter(
                    pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                    attr_name=request.data['name']).values_list('attr_type'))[0][0]):
                put_attr = Attributes.objects.filter(
                    pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                    attr_name=request.data['name']).first()
                put_attr.attr_value = request.data['value']
                put_attr.save()
                print("Объект изменен")
                return Response("Объект изменен")
            else:
                return Response("Ошибка ввода")
        else:
            print("Такой объект не существует")
            return Response("Такой объект не существует")

    # Удаление
    def delete(self, request):
        if Attributes.objects.filter(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                attr_name=request.data['name']).first():
            del_attr = Attributes.objects.filter(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(),
                attr_name=request.data['name']).first()
            del_attr.delete()
            print("Объект удален")
            return Response("Объект удален")
        else:
            print("Такой объект не существует")
            return Response("Такой объект не существует")


class GetPathology(APIView):
    def get(self, request):
        data = list(set(KnowledgeBase.objects.exclude(pathology_name="Здоров").values_list(flat=True)))
        return Response(data)


class AddColumn(APIView):
    def post(self, request):
        name = request.data["name"]
        return Response


class ListAttrsDescPath(APIView):
    def post(self, request):
        print("request.data")
        print(request.data['pathology'])

        dataa = list(
            Attributes.objects.filter(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first()).all())
        serializer = AttributesSerializer(dataa, many=True)
        print(serializer.data)
        return Response(serializer.data)


class ListAttrsDescPathValues(APIView):
    def get(self, request):
        dataa = list(
            Attributes.objects.filter(pathology=KnowledgeBase.objects.filter(pathology_name="Здоров").first()).all())
        serializer = AttributesSerializer(dataa, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request):
        print(request.data['name'])
        print(request.data['type'])
        if request.data['type'] == "Бинарный" or request.data['type'] == "Перечислимый":
            data = list(
                ListAttributes.objects.filter(la_name=request.data['name'], la_type=request.data['type']).values_list(
                    'la_value'))
            print(data)
            return Response(data)

        return

    def put(self, request):
        print(request.data['name'])
        print(request.data['type'])
        print(request.data['value'][0])

        if request.data['type'] == "Бинарный" or request.data['type'] == "Перечислимый":
            item = Attributes.objects.filter(pathology=request.data['pathology'], attr_name=request.data['name'],
                                             attr_type=request.data['type']).first()
            item.attr_value = request.data['value'][0]
            item.save()
            return Response("Значение добавлено")

        if request.data['type'] == "Интервальный":
            in_int = request.data['value']
            if re.fullmatch('\d+', in_int):
                def_int = list(ListAttributes.objects.filter(la_name=request.data['name'],
                                                             la_type=request.data['type']).values_list(
                    'la_value'))[0][0]

                sep = re.split('-', str(def_int))
                def_int_min = int(sep[0])
                def_int_max = int(sep[1])
                if int(in_int) >= def_int_min and int(in_int) <= def_int_max:
                    item = Attributes.objects.filter(pathology=request.data['pathology'],
                                                     attr_name=request.data['name'],
                                                     attr_type=request.data['type']).first()
                    item.attr_value = in_int
                    item.save()
                    return Response("Задано нормальное значение")
                else:
                    return Response("Выход за границы вохможных значений")
            if re.fullmatch('\d+[-]\d+', in_int):
                sep = re.split('-', in_int)
                print(sep)
                in_int_min = int(sep[0])
                in_int_max = int(sep[1])

                def_int = list(ListAttributes.objects.filter(la_name=request.data['name'],
                                                             la_type=request.data['type']).values_list(
                    'la_value'))[0][0]

                sep = re.split('-', str(def_int))
                def_int_min = int(sep[0])
                def_int_max = int(sep[1])

                if in_int_min >= def_int_min and in_int_max <= def_int_max:
                    item = Attributes.objects.filter(pathology="Здоров", attr_name=request.data['name'],
                                                     attr_type=request.data['type']).first()
                    item.attr_value = in_int
                    item.save()
                    return Response("Задано нормальное значение")
                else:
                    return Response("Выход за границы вохможных значений")
                # if int(val_check) >= int1_min and int(val_check) <= int1_max:
                #     return True
                # else:
                #     return False

            return Response("Ошибка ввода")


class ListAttrsDesc(APIView):
    def get(self, request):
        dataa = list(
            Attributes.objects.filter(pathology=KnowledgeBase.objects.filter(pathology_name="Здоров").first()).all())
        serializer = AttributesSerializer(dataa, many=True)
        print(serializer.data)
        return Response(serializer.data)

    def post(self, request):
        print(request.data['name'])
        print(request.data['type'])
        if request.data['type'] == "Бинарный" or request.data['type'] == "Перечислимый":
            data = list(
                ListAttributes.objects.filter(la_name=request.data['name'], la_type=request.data['type']).values_list(
                    'la_value'))
            print(data)
            return Response(data)

        return

    def put(self, request):
        print(request.data['name'])
        print(request.data['type'])
        print("aaaaaaaaa")
        print(request.data['value'][0])

        if request.data['type'] == "Бинарный" or request.data['type'] == "Перечислимый":
            item = Attributes.objects.filter(pathology="Здоров", attr_name=request.data['name'],
                                             attr_type=request.data['type']).first()
            item.attr_value = request.data['value'][0]
            item.save()
            return Response("Значение добавлено")

        if request.data['type'] == "Интервальный":
            in_int = request.data['value']
            if re.fullmatch('\d+', in_int):
                def_int = list(ListAttributes.objects.filter(la_name=request.data['name'],
                                                             la_type=request.data['type']).values_list(
                    'la_value'))[0][0]

                sep = re.split('-', str(def_int))
                def_int_min = int(sep[0])
                def_int_max = int(sep[1])
                if int(in_int) >= def_int_min and int(in_int) <= def_int_max:
                    item = Attributes.objects.filter(pathology="Здоров", attr_name=request.data['name'],
                                                     attr_type=request.data['type']).first()
                    item.attr_value = in_int
                    item.save()
                    return Response("Задано нормальное значение")
                else:
                    return Response("Выход за границы вохможных значений")
            if re.fullmatch('\d+[-]\d+', in_int):
                sep = re.split('-', in_int)
                print(sep)
                in_int_min = int(sep[0])
                in_int_max = int(sep[1])

                def_int = list(ListAttributes.objects.filter(la_name=request.data['name'],
                                                             la_type=request.data['type']).values_list(
                    'la_value'))[0][0]

                sep = re.split('-', str(def_int))
                def_int_min = int(sep[0])
                def_int_max = int(sep[1])

                if in_int_min >= def_int_min and in_int_max <= def_int_max:
                    item = Attributes.objects.filter(pathology="Здоров", attr_name=request.data['name'],
                                                     attr_type=request.data['type']).first()
                    item.attr_value = in_int
                    item.save()
                    return Response("Задано нормальное значение")
                else:
                    return Response("Выход за границы вохможных значений")
                # if int(val_check) >= int1_min and int(val_check) <= int1_max:
                #     return True
                # else:
                #     return False

            return Response("Ошибка ввода")


class ListAttrs(APIView):
    def get(self, request):
        data = list(set(ListAttributes.objects.values_list("la_name")))
        print(data)
        return Response(data)

    def post(self, request):
        new_item = ListAttributes(la_name=request.data['name'])
        new_item.save()

        item_normal = Attributes(pathology=KnowledgeBase.objects.filter(pathology_name="Здоров").first(),
                                 attr_name=request.data['name'])
        item_normal.save()

        return Response("Признак добавлен")

    def delete(self, request):
        del_item = ListAttributes.objects.filter(la_name=request.data['name'][0]).all()
        del_item.delete()

        del_from_pat = Attributes.objects.filter(attr_name=request.data['name'][0]).all()
        del_from_pat.delete()
        return Response("Признак удален")


class SetValue(APIView):
    def get(self, request):
        attrs = ListAttributes.objects.order_by('la_name').exclude(la_value='', la_type='')
        serializer = ListAttrsSerializer(attrs, many=True)

        return Response(serializer.data)

    def post(self, request):
        if ListAttributes.objects.filter(la_name=request.data['name'][0]).exclude(la_type='').first():
            if request.data['type'] != \
                    str(list(ListAttributes.objects.filter(la_name=request.data['name'][0]).values_list('la_type'))[0][
                            0]):
                return Response("Для этого признака ранее объявлен другой тип")
            else:
                if not ListAttributes.objects.filter(la_name=request.data['name'][0], la_type=request.data['type'],
                                                     la_value=request.data['value']).first():
                    if request.data['type'] == "Интервальный":
                        new_item = ListAttributes.objects.filter(la_name=request.data['name'][0],
                                                                 la_type=request.data['type']).first()
                        new_item.la_value = request.data['value']
                        new_item.save()
                    else:
                        new_item = ListAttributes(la_name=request.data['name'][0], la_type=request.data['type'],
                                                  la_value=request.data['value'])
                        new_item.save()

                    attr = Attributes.objects.filter(attr_name=request.data['name'][0],
                                                     pathology=KnowledgeBase.objects.filter(
                                                         pathology_name="Здоров").first()).first()
                    attr.attr_type = request.data['type']
                    attr.save()
                else:
                    return Response("Такое значение уже существует")
                # attr = Attributes.objects.filter(attr_name=request.data['name'][0]).all()
                #
                # for i in range(attr):
                #     attr[i].attr_type = request.data['type']
                #     attr[i].save()

                return Response("Добавлено возможное значение")
        else:
            new_attr = ListAttributes.objects.filter(la_name=request.data['name'][0], la_type='').first()
            new_attr.la_type = request.data['type']
            new_attr.la_value = request.data['value']
            new_attr.save()

            attr = Attributes.objects.filter(attr_name=request.data['name'][0],
                                             pathology=KnowledgeBase.objects.filter(
                                                 pathology_name="Здоров").first()).first()
            attr.attr_type = request.data['type']
            attr.save()

            # attr = Attributes.objects.filter(attr_name=request.data['name'][0]).all()
            #
            # for i in range(attr):
            #     attr[i].attr_type = request.data['type']
            #     attr[i].save()
            # return Response("Добавлено возможное значение")

    def delete(self, request):
        del_val = ListAttributes.objects.filter(la_name=request.data['name'], la_type=request.data['type'],
                                                la_value=request.data['value']).first()

        del_val.la_value = ''
        del_val.la_type = ''
        del_val.save()

        if ListAttributes.objects.filter(la_name=request.data['name']).exclude(la_type='',
                                                                               la_value=''):
            del_val.delete()

        return Response("Возможное значение удалено")


class AttrsDesc(APIView):
    def post(self, request):
        print(request.data)
        print(request.data['pathology'])

        old_attr = Attributes.objects.filter(
            pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first()).all()
        old_attr.delete()

        for i in range(len(request.data['attrs'])):
            print(request.data['attrs'][i])
            new_attr = Attributes(
                pathology=KnowledgeBase.objects.filter(pathology_name=request.data['pathology']).first(), attr_name=
                request.data['attrs'][i], attr_type=
                list(ListAttributes.objects.filter(la_name=request.data['attrs'][i]).values_list('la_type'))[0][0])
            new_attr.save()

        return Response("Признаковое описание добавлено")


class CheckPathology(APIView):
    def post(self, request):
        items_list = request.data['items']
        values_list = request.data['data']

        result = ""

        print(items_list)
        print(values_list)

        pathologys = list(KnowledgeBase.objects.values_list(flat=True))
        check_path = list(KnowledgeBase.objects.values_list(flat=True))
        print(pathologys)

        for i in range(len(pathologys)):
            for j in range(len(values_list)):
                print(pathologys[i])
                if values_list[j] != None:
                    if list(Attributes.objects.filter(pathology=pathologys[i], attr_name=items_list[j]).values_list(
                            'attr_value')):

                        check = list(
                            Attributes.objects.filter(pathology=pathologys[i], attr_name=items_list[j]).values_list(
                                'attr_value'))[0][
                            0]
                        print(check)
                        if (str(values_list[j]) == "Да" or str(values_list[j]) == "Нет") and \
                                list(Attributes.objects.filter(attr_name=items_list[j]).values_list('attr_type'))[0][
                                    0] == "Бинарный":
                            if str(check) != str(values_list[j]):
                                result += pathologys[i] + ' не подходит по признаку ' + items_list[j] + '\n'
                                check_path.remove(pathologys[i])

                        if re.match('\d+', str(values_list[j])) and \
                                list(Attributes.objects.filter(attr_name=items_list[j]).values_list('attr_type'))[0][
                                    0] == "Интервальный" and Attributes.objects.filter(pathology=pathologys[i],
                                                                                       attr_name=items_list[
                                                                                           j]).values_list(
                            'attr_value'):
                            check = list(
                                Attributes.objects.filter(pathology=pathologys[i], attr_name=items_list[j]).values_list(
                                    'attr_value'))[0][0]
                            if not check_interval(str(values_list[j]), check):
                                result += pathologys[i] + ' не подходит по признаку ' + items_list[j] + '\n'
                                check_path.remove(pathologys[i])

                        if re.match('\w+', str(values_list[j])) and \
                                list(Attributes.objects.filter(attr_name=items_list[j]).values_list('attr_type'))[0][
                                    0] == "Перечислимый" and Attributes.objects.filter(pathology=pathologys[i],
                                                                                       attr_name=items_list[
                                                                                           j]).values_list(
                            'attr_value'):
                            check = list(
                                Attributes.objects.filter(pathology=pathologys[i], attr_name=items_list[j]).values_list(
                                    'attr_value'))[0][0]
                            if not check_list(str(values_list[j]), check):
                                result += pathologys[i] + ' не подходит по признаку ' + items_list[j] + '\n'
                                check_path.remove(pathologys[i])

        result += "Возможные классы" + str(check_path)
        return Response(result)
        # for i in range(len(values_list)):
        #     if str(values_list[i]) == "Да" or str(values_list[i]) == "Нет":
        #         if list(Attributes.objects.filter(attr_name=items_list[i]).values_list('attr_type'))[0][
        #             0] == "Бинарный":
        #             pathology_list = list(
        #                 Attributes.objects.filter(attr_name=items_list[i]).values_list("pathology", flat=True))
        #
        #             for j in range(len(pathology_list)):
        #                 if values_list[i] == list(
        #                         Attributes.objects.filter(attr_name=items_list[i],
        #                                                   pathology=pathology_list[j]).values_list(
        #                             "attr_value"))[0][0]:
        #                     result = result + str(items_list[i]) + " " + str(pathology_list[j]) + ';\n'
        #                     # print("Check!")
        #
        #     if re.match('\d+', str(values_list[i])) and \
        #             list(Attributes.objects.filter(attr_name=items_list[i]).values_list('attr_type'))[0][
        #                 0] == "Интервальный":
        #         pathology_list = list(
        #             Attributes.objects.filter(attr_name=items_list[i]).values_list("pathology", flat=True))
        #         print(pathology_list)
        #
        #         for j in range(len(pathology_list)):
        #             if check_interval(list(
        #                     Attributes.objects.filter(attr_name=items_list[i],
        #                                               pathology=pathology_list[j]).values_list(
        #                         "attr_value"))[0][0], values_list[i]):
        #                 result = result + str(items_list[i]) + " " + str(pathology_list[j]) + ';\n'
        #                 print("Check INERVAL!")
        #
        #     if re.match('\w+', str(values_list[i])) and \
        #             list(Attributes.objects.filter(attr_name=items_list[i]).values_list('attr_type'))[0][
        #                 0] == "Перечислимый":
        #         pathology_list = list(
        #             Attributes.objects.filter(attr_name=items_list[i]).values_list("pathology", flat=True))
        #         print(pathology_list)
        #
        #         for j in range(len(pathology_list)):
        #             if check_list(list(Attributes.objects.filter(attr_name=items_list[i],
        #                                                          pathology=pathology_list[j]).values_list(
        #                 "attr_value"))[0][0], values_list[i]):
        #                 result = result + str(items_list[i]) + " " + str(pathology_list[j]) + ';\n'
        #                 print("Check PERECH!")

        # result = final_res(result)

    # получение списка атрибутов
    def get(self, arg):
        items_list = list(Attributes.objects.order_by("attr_name").values_list("attr_name", flat=True))
        items_list = list(set(items_list))

        return Response(items_list)


class CheckIntegrity(APIView):
    def get(self, request):
        result = ''
        pathology = list(KnowledgeBase.objects.values_list(flat=True))

        for i in range(len(pathology)):
            if not list(Attributes.objects.filter(
                    pathology=KnowledgeBase.objects.filter(pathology_name=pathology[i]).first()).values_list(
                'attr_name')):
                result += str(pathology[i]) + ' не имеет ни одного признака.' + '\n'

        print(list(ListAttributes.objects.values_list('la_name')))
        attrs = list(ListAttributes.objects.values_list('la_name'))
        for i in range(len(attrs)):
            if list(ListAttributes.objects.filter(la_name=attrs[i][0], la_value='')):
                result += str(attrs[i][0]) + ' не имеет возможных значений.' + '\n'

        return Response(result)


def check_input(check, type):
    print(check)
    print(type)
    if type == "Булево":
        if check == "Да" or check == "Нет":
            return True
        else:
            return False

    if type == "Перечислимый":
        if re.fullmatch('((\w+\s?)+[,]?\s?)+', check):
            return True
        else:
            return False

    if type == "Интервал":
        if re.fullmatch('\d+', check) or re.fullmatch('\d+[-]\d+', check):
            return True
        else:
            return False


def check_interval(val_check, int1):
    if re.fullmatch('\d+', str(int1)):
        print("TEST")
        print(val_check)
        print(int1)

        if int(int1) == int(val_check):
            return True
        else:
            return False
    else:
        sep = re.split('-', int1)
        print(sep)
        int1_min = int(sep[0])
        int1_max = int(sep[1])

        if int(val_check) >= int1_min and int(val_check) <= int1_max:
            return True
        else:
            return False


def check_list(val_list, val_check):
    print("val_list")
    if str(val_list).find(str(val_check)) != -1 and val_check != '' and val_check != None:
        print(val_list)
        print(str(val_list).find(str(val_check)))
        print(val_check)
        return True
    else:
        return False


def final_res(res):
    count = -1
    pat = ''

    # normal = list(KnowledgeBase.objects.filter(pathology_name="Здоров").values_list()[0][0])
    #
    # attrs_list = Attributes.objects.filter(pathology="Здоров").all()
    #
    # for i in range(attrs_list):
    #

    pathology_list = list(set(KnowledgeBase.objects.values_list(flat=True)))

    if res == '':
        return "Ошибка ввода"

    for i in range(len(pathology_list)):
        print(pathology_list[i])
        temp_count = res.count(str(pathology_list[i]))
        if temp_count > count:
            count = temp_count
            pat = pathology_list[i]

    # for i in range(len(pathology_list)):
    #     temp_count = res.count(str(pathology_list[i]))
    #     if temp_count == count and pat != pathology_list[i]:
    #         res += "\nТочную патологию установть невозможно"
    #         return str(res)

    res = res + "\nВозможные значения: " + str(pat)
    return str(res)
